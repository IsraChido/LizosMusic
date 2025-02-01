import express from 'express';
import { Config, JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

const app = express();
const db = new JsonDB(new Config('eventsDB', true, false, '/'));

// Middleware para validar el API token
const validateApiToken = (req, res, next) => {
  const apiToken = req.headers['x-api-token'];
  const validToken = 'test_api_token_123';

  if (!apiToken || apiToken !== validToken) {
    return res
      .status(401)
      .json({ message: 'Acceso no autorizado. Token inválido o faltante.' });
  }

  next();
};

app.use(cors());
app.use(validateApiToken);
app.use(express.json());

// GET /api/events - Listado de eventos con información resumida
app.get('/api/events', async (req, res) => {
  try {
    const query = req.query.q ? req.query.q.toLowerCase() : '';
    const field = req.query.field || ''; // Campo a buscar (opcional)
    const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
    const limit = parseInt(req.query.limit) || 10; // Límites por página (por defecto 10)

    const events = await db.getData('/lizosmusic/event');

    // Filtrar eventos si hay una búsqueda
    const filteredEvents = events.filter((event) => {
      if (!query) return true; // Si no hay consulta, devuelve todos los eventos

      const queryWords = query.split(' '); // Divide el query en palabras clave

      switch (field) {
        case 'name':
          return event.name.toLowerCase().includes(query);
        case 'venue.name':
          return event.venue.name.toLowerCase().includes(query);
        case 'venue.city':
          return event.venue.city.toLowerCase().includes(query);
        case 'tags':
          // Verifica que todas las palabras clave están en el conjunto de tags
          return queryWords.every((word) =>
            event.tags.some((tag) => tag.toLowerCase().includes(word))
          );
        default:
          // Búsqueda en todos los campos si no se especifica un campo
          return (
            event.name.toLowerCase().includes(query) ||
            event.venue.name.toLowerCase().includes(query) ||
            event.venue.city.toLowerCase().includes(query) ||
            queryWords.every((word) =>
              event.tags.some((tag) => tag.toLowerCase().includes(word))
            )
          );
      }
    });

    // Implementar paginado
    const total = filteredEvents.length; // Total de eventos filtrados
    const startIndex = (page - 1) * limit; // Índice inicial
    const endIndex = startIndex + limit; // Índice final
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    // Mapear para devolver solo información necesaria
    const result = paginatedEvents.map((event) => ({
      id: event.id,
      name: event.name,
      slug: event.slug,
      start_at: event.start_at,
      end_at: event.end_at,
      status: event.status,
      tags: event.tags,
      venue: {
        id: event.venue.id,
        name: event.venue.name,
        city: event.venue.city,
        state: event.venue.state,
        country: event.venue.country,
      },
      image_url: event.image_url,
    }));

    // Respuesta con información de paginado
    res.json({
      data: result,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: 'Error al obtener los eventos' });
  }
});

// GET /api/events/:id - Información detallada del evento
app.get('/api/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const events = await db.getData('/lizosmusic/event');
    const event = events.find((e) => e.id == eventId);

    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.json({ data: event });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error al obtener la información del evento' });
  }
});

// POST /api/reservations - Crear una reservación
app.post('/api/reservations', async (req, res) => {
  try {
    const { eventId, tickets } = req.body;
    if (!eventId || !tickets || !Array.isArray(tickets)) {
      return res
        .status(400)
        .json({ message: 'Datos de reservación inválidos' });
    }

    const events = await db.getData('/lizosmusic/event');
    const eventIndex = events.findIndex((e) => e.id == eventId);
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    // Verificar disponibilidad
    for (const ticket of tickets) {
      const { category, quantity } = ticket;
      const ticketCategory = events[eventIndex].pricing.find(
        (c) => c.category === category
      );
      if (!ticketCategory || ticketCategory.stock < quantity) {
        return res.status(400).json({
          message: `Stock insuficiente o categoría no válida para: ${category}`,
        });
      }
    }

    const reservation = {
      id: uuidv4(),
      eventId,
      tickets,
      timestamp: new Date().toISOString(),
      status: 'pending',
      holdExpiration: new Date(Date.now() + 15 * 60000).toISOString(), // 15 minutos
    };

    // Guardar reservación
    const reservations = await db.getData('/lizosmusic/order').catch(() => []);
    reservations.push(reservation);
    await db.push('/lizosmusic/order', reservations, true);

    res.json({ message: 'Reservación creada con éxito', data: reservation });
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar la reservación' });
  }
});

// POST /api/payments/process - Procesar pago
app.post('/api/payments/process', async (req, res) => {
  try {
    const { reservationId } = req.body;
    if (!reservationId) {
      return res
        .status(400)
        .json({ message: 'Faltan datos en la solicitud de pago' });
    }

    const reservations = await db.getData('/lizosmusic/order').catch(() => []);
    const reservation = reservations.find((r) => r.id === reservationId);

    if (!reservation) {
      return res.status(404).json({ message: 'Reservación no encontrada' });
    }

    if (new Date(reservation.holdExpiration) < new Date()) {
      return res.status(400).json({ message: 'La reservación ha expirado' });
    }

    const paymentSuccess = Math.random() < 0.7; // 70% de éxito
    if (paymentSuccess) {
      // Actualizar stock
      const events = await db.getData('/lizosmusic/event');
      const eventIndex = events.findIndex((e) => e.id == reservation.eventId);

      for (const ticket of reservation.tickets) {
        const ticketCategory = events[eventIndex].pricing.find(
          (c) => c.category === ticket.category
        );
        ticketCategory.stock -= ticket.quantity;
        if (ticketCategory.stock === 0) {
          ticketCategory.available = false;
        }
      }

      await db.push('/lizosmusic/event', events, true);

      reservation.status = 'paid';
      await db.push('/lizosmusic/order', reservations, true);

      res.json({ message: 'Pago exitoso', data: reservation });
    } else {
      res.status(400).json({
        message: 'El pago ha fallado, por favor intente nuevamente',
        data: reservation,
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al procesar el pago' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API running on port ${PORT}`);
});
