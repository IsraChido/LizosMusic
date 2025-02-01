import { Config, JsonDB } from 'node-json-db';
import { v4 as uuidv4 } from 'uuid';

const db = new JsonDB(new Config('eventsDB', true, false, '/'));

const categories = ['VIP', 'PREFERENTE', 'GENERAL', 'RINGSIDE', 'PLATINUM'];
const venues = [
  {
    name: 'Auditorio Nacional',
    city: 'Ciudad de México',
    state: 'Ciudad de México',
    timezone: 'America/Mexico_City',
  },
  {
    name: 'Foro Sol',
    city: 'Ciudad de México',
    state: 'Ciudad de México',
    timezone: 'America/Mexico_City',
  },
  {
    name: 'Arena Monterrey',
    city: 'Monterrey',
    state: 'Nuevo León',
    timezone: 'America/Monterrey',
  },
  {
    name: 'Estadio Jalisco',
    city: 'Guadalajara',
    state: 'Jalisco',
    timezone: 'America/Mexico_City',
  },
  {
    name: 'Plaza de Toros Cancún',
    city: 'Cancún',
    state: 'Quintana Roo',
    timezone: 'America/Cancun',
  },
  {
    name: 'Estadio Teodoro Mariscal',
    city: 'Mazatlán',
    state: 'Sinaloa',
    timezone: 'America/Mazatlan',
  },
];
const tagsPool = [
  'música',
  'deportes',
  'cultural',
  'gastronomía',
  'festival',
  'teatro',
  'conferencia',
  'concierto',
  'exposición',
  'familia',
];

const eventPrefixes = [
  'Gran',
  'Increíble',
  'Festival',
  'Show',
  'Espectáculo',
  'Concierto',
  'Encuentro',
  'Presentación',
  'Experiencia',
  'Celebración',
  'Fiesta',
  'Concurso',
];
const eventSubjects = [
  'Música',
  'Deportes',
  'Gastronomía',
  'Teatro',
  'Cultura',
  'Familia',
  'Diversión',
  'Arte',
  'Entretenimiento',
  'Aventura',
  'Moda',
  'Tecnología',
  'Ciencia',
];
const eventSuffixes = [
  'del Año',
  '2025',
  'Nacional',
  'Internacional',
  'Único',
  'en Vivo',
  'de Verano',
  'Anual',
  'de Temporada',
];

function generateEventName() {
  const prefix =
    eventPrefixes[Math.floor(Math.random() * eventPrefixes.length)];
  const subject =
    eventSubjects[Math.floor(Math.random() * eventSubjects.length)];
  const suffix =
    eventSuffixes[Math.floor(Math.random() * eventSuffixes.length)];
  return `${prefix} ${subject} ${suffix}`;
}

function getRandomElements(arr, min, max) {
  const count = Math.floor(Math.random() * (max - min + 1)) + min;
  return [...arr].sort(() => 0.5 - Math.random()).slice(0, count);
}

function adjustStock(stock) {
  const shouldAdjust = Math.random() < 0.2; // 20% de probabilidad
  if (shouldAdjust) {
    return Math.random() < 0.5 ? 0 : Math.floor(Math.random() * 5) + 1; // Stock 0 o entre 1 y 5
  }
  return stock;
}

function generateRandomEvent(id) {
  const venue = venues[Math.floor(Math.random() * venues.length)];
  const startTime = new Date(
    Date.now() + Math.random() * 30 * 24 * 60 * 60 * 1000
  );
  const endTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000);

  return {
    id,
    name: generateEventName(),
    slug: `evento-${id}-${venue.name.toLowerCase().replace(/\s+/g, '-')}`,
    start_at: startTime.toISOString(),
    end_at: endTime.toISOString(),
    status: 'published',
    image_url: `https://picsum.photos/800/600?random=${id}`,
    tags: getRandomElements(tagsPool, 3, 7),
    venue: {
      id,
      name: venue.name,
      city: venue.city,
      state: venue.state,
      country: 'México',
      postal_code: 'XXXXX',
      timezone: venue.timezone,
      maps_url: 'https://maps.google.com/?q=19.4269,-99.1719',
    },
    pricing: categories.map((category) => {
      const originalStock = Math.floor(Math.random() * 500) + 50;
      const adjustedStock = adjustStock(originalStock);
      return {
        price: Math.floor(Math.random() * 200000) + 50000,
        category,
        color: '#' + Math.floor(Math.random() * 16777215).toString(16),
        stock: adjustedStock,
      };
    }),
    reviews: {
      rating: (Math.random() * 2 + 3).toFixed(1),
      count: Math.floor(Math.random() * 500),
      recent: Array.from({ length: Math.floor(Math.random() * 6) + 5 }, () => ({
        user: `Usuario ${uuidv4().slice(0, 8)}`,
        rating: Math.floor(Math.random() * 2) + 4,
        comment: 'Evento increíble, muy bien organizado!',
      })),
    },
  };
}

async function generateDummyEvents() {
  try {
    const events = Array.from({ length: 50 }, (_, i) =>
      generateRandomEvent(i + 1)
    );
    await db.push('/lizosmusic/event', events, true);
    console.log('50 eventos generados y guardados en node-json-db');
  } catch (error) {
    console.error('Error al generar eventos dummy', error);
  }
}

generateDummyEvents();
