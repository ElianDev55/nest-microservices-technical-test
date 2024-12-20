# nest-microservices-technical-test

## Description

Develop a basic order management system for an online store, implemented with a microservices architecture and designed to meet the following requirements:

## Technologies Used

- **TypeScript**
- **NestJS**: Framework for building server-side applications
- **Microservices**: Microservices architecture

## Microservices Structure

The gateway starts at the route `localhost:3005`. From here, the following microservices can be used:

- **Products**: Initialized at the `localhost:3001` path
- **Orders**: Initialized at the `localhost:3002` path
- **Notification**: Initialized at the `localhost:3003` path

The microservices communicate with each other using NATS, a lightweight, high-performance messaging system that facilitates asynchronous communication and scalability.

A PostgreSQL database with TypeORM was used for data management.

![Microservices Architecture](https://res.cloudinary.com/dw6vdykba/image/upload/v1734711159/o5klikmvz7jp7bv0upmp.jpg)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/ElianDev55/nest-microservices-technical-test.git
```

2. Navigate to the project directory:

```bash
cd nest-microservices-technical-test
```

3. Start Docker:

```bash
docker-compose up
```

## Usage

To use the application, use Postman with the following paths on `localhost:3005`:

- **Products**: `/products`
- **Orders**: `/orders`

### Example to create a product

```json
{
"name": "Iphone",
"price": 10.0,
"initial_stock": 100
}
```

### Example for creating an order

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

## Note

There was a problem creating a microservice for the third table in `Order` with `Product`, but I decided that it wouldn't be necessary since it is part of `Order` and is not a new feature.

## Contribution

Contributions are welcome. Please open an issue or send a pull request.

## License

This project does not have a specific license.

## Contact

- **GitHub**: [ElianDev55](https://github.com/ElianDev55)

## Video

[Watch this video here](https://res.cloudinary.com/dw6vdykba/video/upload/v1734711940/iek9ftqoyamrak6gvtrb.mp4)
