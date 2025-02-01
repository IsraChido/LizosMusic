# Entrevista técnica

Bienvenido/a a la prueba técnica para el puesto de desarrollador Frontend en Lizos Music. En esta prueba, desarrollaremos una aplicación interactiva para buscar eventos, seleccionar boletos y procesar pagos.

---

## 📋 Resumen

Tendrás 90 minutos para:

1. Implementar un buscador de eventos que permita filtrar por nombre, lugar o tags.
2. Mostrar detalles del evento seleccionado y sus categorías de boletos.
3. Permitir la selección de boletos con validaciones.
4. Simular un flujo de pago con validaciones y actualizaciones de estado.

---

## 🎯 Objetivos Específicos

- Crear una interfaz de usuario funcional y clara.
- Integrar datos de una API en tiempo real.
- Manejar estados y validaciones con precisión.

---

## 🛠️ Setup Técnico

**1. Preparar la api**

```bash
# Crea la base de datos con eventos
npm run seed-db

# Inicia la API
npm run start-api
```

- **En Stackblitz:**

API disponible en https://vitejsvitepkoxtx43-jlko--3000--1b4252dd.local-credentialless.webcontainer.io

- **En local:**

Descarga el proyecto, instala dependencias con `npm install` y accede en http://localhost:3000.

```bash
npm install
```

**2. Autenticación:**

Incluye el header **x-api-token** con el valor `test_api_token_123` en todas las solicitudes.

## 📋 Requerimientos

1. **Visualización de Eventos**

- Layout principal con navbar que incluya un botón para volver a la página principal.
- Buscador para filtrar por:
  - Nombre del evento.
  - Tags.
  - Lugar (ciudad o estado).
- Lista de eventos filtrados con:
  - Nombre, imagen destacada, fecha/hora, ubicación.

![event-search.png](/public/event-search.png 'Event Search')

2. **Detalles del evento**

- Al seleccionar un evento:
  - Mostrar las categorías de boletos con precio, stock y color.
  - Permitir seleccionar hasta 4 boletos por categoría.
  - Actualizar el total en tiempo real.

![event-details.png](/public/event-details.png 'Event Details')

3. **Proceso de Pago**

- Mostrar un modal con formulario:
  - Nombre completo (text, min 6, max 255)
  - Email (text, email)
  - Teléfono (numérico, min 10, max 10)
  - Número de tarjeta (numérico, min 16, max 16)
  - Validar datos antes de enviar.
- Al procesar el pago:
  - Mostrar mensaje de éxito, limpiar la selección.
  - Mostrar mensaje de error si el pago falla.

![checkout-modal](/public/checkout-moda.png 'Checkout Modal')

### 2. Interactividad

Permite la selección de boletos por categoría:

- Máximo de **4 boletos por categoría, por usuario**.
- Muestra un mensaje de error si se supera el límite.
- Calcula y actualiza en tiempo real el **total del precio** según los boletos seleccionados.
- Muestra una advertencia si el stock está agotado al intentar seleccionar boletos.

### 3. Integración API

Consume los siguientes endpoints para obtener los datos en vivo:

### **Base URL**

Stackblitz

`https://vitejsvitepkoxtx43-jlko--3000--1b4252dd.local-credentialless.webcontainer.io/api`

Local

`http://localhost:3000/api`

### Autenticación

Todas las solicitudes a la API requieren un encabezado adicional para autenticación. Debes incluir el siguiente header en cada solicitud:

```
x-api-token: test_api_token_123
```

**Errores relacionados**

Si el token no se incluye o es incorrecto, la API devolverá un error 401 Unauthorized:

```json
{
  "message": "Acceso no autorizado. Token inválido o faltante."
}
```

### **Endpoints**

### 1. **GET `/events`**

Obtiene la lista de eventos. Permite realizar una búsqueda filtrando por palabras clave.

### **Request**

- **Query Parameters (opcional):**
  - `q`: String para buscar en el nombre, lugar, ciudad o tags.
  - `field`: Especifica el campo a buscar (`name`, `venue.name`, `venue.city`, `tags`)
  - `page`: Página actual
  - `limit`: Resultados por página

### **Response**

- **200 OK**

```json
{
  "data": [
    {
    "id": 1,
    "name": "Evento 1 - Auditorio Nacional",
    "slug": "evento-1-auditorio-nacional",
    "start_at": "2025-02-15T20:00:00.000Z",
    "end_at": "2025-02-15T23:00:00.000Z",
    "status": "published",
    "tags": ["música", "cultural"],
    "venue": {
      "id": 1,
      "name": "Auditorio Nacional",
      "city": "Ciudad de México",
      "state": "México",
      "country": "México",
      "postal_code": "XXXXX",
      "timezone": "America/Mexico_City",
      "maps_url": "https://maps.google.com/?q=19.4269,-99.1719"
    },
    "image_url": "https://picsum.photos/800/600?random=1",
    }
  ],
  "meta": {
    "total": 50,
		"page": 1,
		"limit": 10,
		"totalPages": 5
  }
}
```

- **500 Internal Server Error**

```json
{
  "message": "Error al obtener los eventos"
}
```

### **2. GET `/events/:id`**

Obtiene los detalles completos de un evento.

### **Request**

**Path Parameters:**

- `id` (requerido): ID del evento.

**Response**

- **200 OK**

```json
{
  "data": {
    "id": 1,
    "name": "Evento 1 - Auditorio Nacional",
    "slug": "evento-1-auditorio-nacional",
    "start_at": "2025-02-15T20:00:00.000Z",
    "end_at": "2025-02-15T23:00:00.000Z",
    "status": "published",
    "tags": ["música", "cultural"],
    "venue": {
      "id": 1,
      "name": "Auditorio Nacional",
      "city": "Ciudad de México",
      "state": "México",
      "country": "México",
      "postal_code": "XXXXX",
      "timezone": "America/Mexico_City",
      "maps_url": "https://maps.google.com/?q=19.4269,-99.1719"
    },
    "image_url": "https://picsum.photos/800/600?random=1",
    "pricing": [
      {
        "price": 120000,
        "category": "VIP",
        "color": "#FF5733",
        "stock": 150
      },
      {
        "price": 80000,
        "category": "General",
        "color": "#33FF57",
        "stock": 300
      }
    ],
    "reviews": {
      "rating": 4.8,
      "count": 256,
      "recent": [
        {
          "user": "Usuario 1",
          "rating": 5,
          "comment": "Evento increíble!"
        },
        {
          "user": "Usuario 2",
          "rating": 4,
          "comment": "Muy buen evento, aunque el estacionamiento fue complicado."
        }
      ]
    }
  }
}
```

- 404 Not Found

```json
{
  "message": "Evento no encontrado"
}
```

- **500 Internal Server Error**

```json
{
  "message": "Error al obtener la información del evento"
}
```

### 3. **POST `/reservations`**

Crea una reservación para un evento específico, reservando una cantidad de boletos por categoría.

**Request**

- **Body:**

```json
{
  "eventId": 1,
  "tickets": [
    {
      "category": "VIP",
      "quantity": 2
    },
    {
      "category": "GENERAL",
      "quantity": 2
    }
  ]
}
```

**Response**

- 200 OK

```json
{
  "message": "Reservación creada con éxito",
  "data": {
    "id": "b67829a8-4b52-451b-90f2-3f6b9670a1cf",
    "eventId": 1,
    "tickets": [
      {
        "category": "VIP",
        "quantity": 2
      },
      {
        "category": "General",
        "quantity": 3
      }
    ],
    "timestamp": "2025-01-27T15:45:00.000Z",
    "status": "pending",
    "holdExpiration": "2025-01-27T16:00:00.000Z"
  }
}
```

- 400 Bad Request (Faltan datos o datos inválidos)

```json
{
  "message": "Datos de reservación inválidos"
}
```

- 400 Bad Request (Stock insuficiente)

```json
{
  "message": "Stock insuficiente o categoría no válida para: VIP"
}
```

- 404 Not Found (El evento no existe)

```json
{
  "message": "Evento no encontrado"
}
```

- 500 Internal Server Error

```json
{
  "message": "Error al procesar la reservación"
}
```

### 4. **POST `/payments/process`**

Procesa el pago de una reservación, verificando su validez y actualizando el stock si el pago es exitoso.

**Request**

- Body:

```json
{
  "reservationId": "b67829a8-4b52-451b-90f2-3f6b9670a1cf"
}
```

### Requerimientos de Integración:

- Muestra un **spinner** mientras los datos se cargan.
- Muestra un mensaje de error si falla la conexión con el servidor.
- Implementa una lógica básica para manejar errores de API (e.g., 500 Internal Server Error, 404 Not Found).

## ✅ Criterios de Evaluación

Tu trabajo será evaluado en base a los siguientes aspectos:

### 1. Estructura del Código:

- Modularidad y reutilización de componentes.
- Claridad y legibilidad del código.

### 2. Manejo de Estados:

- Control de la selección de boletos.
- Actualización en tiempo real del total de la selección.

### 3. Integración API:

- Manejo adecuado de la carga y errores.
- Uso eficiente de los datos de la API.

### 4. UX/UI Básica:

- Interfaz clara, funcional y fácil de entender.
- Respuesta adecuada a interacciones del usuario.

### 5. Comunicación:

- Explicación de tus decisiones técnicas durante la sesión.

## 🕒 Duración Total

Tendrás **90 minutos** para completar esta prueba.

## 💡 Tips para la Prueba

- Prioriza las funcionalidades críticas primero.
- Usa componentes reutilizables para eventos y categorías.
- Mantén un enfoque modular y escalable.
- No te preocupes por un diseño elaborado; concéntrate en la funcionalidad.
- Pregunta si algo no está claro; estaremos disponibles para aclarar dudas.

## 🚀 Extensiones Opcionales (Si Tienes Tiempo)

Si terminas los requerimientos antes del tiempo límite, considera implementar:

- Agregar paginado a la carga de eventos
- Utilizar `fields` para filtrar con algún campo en particular
- Mostrar eventos relacionados basados en tags compartidos.

## 🌟 ¡Buena Suerte!

Estamos emocionados por ver tu solución. Recuerda comunicar tus decisiones técnicas durante la prueba. ¡Éxito! 🎉
