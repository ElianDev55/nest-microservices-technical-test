# nest-microservices-technical-test

## Descripción

Desarrollar un sistema básico de gestión de pedidos para una tienda en línea, implementado con una arquitectura de microservicios y diseñado para cumplir con los siguientes requisitos:

## Tecnologías Usadas

- **TypeScript**
- **NestJS**: Framework para construir aplicaciones del lado del servidor
- **Microservices**: Arquitectura de microservicios

## Estructura de Microservicios

El gateway empieza en la ruta `localhost:3005`. Desde aquí, se pueden usar los siguientes microservicios:

- **Products**: Inicializado en la ruta `localhost:3001`
- **Orders**: Inicializado en la ruta `localhost:3002`
- **Notification**: Inicializado en la ruta `localhost:3003`

Los microservicios se comunican entre sí mediante NATS, un sistema de mensajería ligero y de alto rendimiento que facilita la comunicación asincrónica y la escalabilidad.

Se utilizó una base de datos PostgreSQL con TypeORM para la gestión de datos.

![Microservices Architecture](https://res.cloudinary.com/dw6vdykba/image/upload/v1734711159/o5klikmvz7jp7bv0upmp.jpg)

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/ElianDev55/nest-microservices-technical-test.git
```

2. Navega al directorio del proyecto:

```bash
cd nest-microservices-technical-test
```

3. Inicia Docker:

```bash
docker-compose up
```

## Uso

Para usar la aplicación, utiliza Postman con las siguientes rutas en `localhost:3005`:

- **Products**: `/products`
- **Orders**: `/orders`

### Ejemplo para crear un producto

```json
{
  "name": "Iphone",
  "price": 10.0,
  "initial_stock": 100
}
```

### Ejemplo para crear una orden

```json
{
  "orderProduct": [
    {
      "productId": 1,
      "quantity": 1000
    }
  ]
}
```

## Nota

Hubo un problema al crear un microservicio para la tercera tabla en `Order` con `Product`, pero decidí que no sería necesario ya que es parte de `Order` y no es una funcionalidad nueva.

## Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o envía un pull request.

## Licencia

Este proyecto no tiene una licencia específica.

## Contacto

- **GitHub**: [ElianDev55](https://github.com/ElianDev55)

## Video

[![Video](https://res.cloudinary.com/dw6vdykba/video/upload/v1734711940/iek9ftqoyamrak)]
