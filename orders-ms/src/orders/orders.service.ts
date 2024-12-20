import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderProduct } from './entities/order-product.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderProduct)
    private readonly orderProductRepository: Repository<OrderProduct>,
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    try {
      const { orderProduct } = createOrderDto;

      const products = await firstValueFrom(
        this.client.send({ cmd: 'validate-product-stock' }, orderProduct),
      );

      console.log(products);

      const totalAmount = createOrderDto.orderProduct.reduce(
        (acc, orderProduct) => {
          const product = products.find(
            (product) => product.id === orderProduct.productId,
          );
          return acc + product.price * orderProduct.quantity;
        },
        0,
      );

      const order = this.orderRepository.create({ totalAmount });

      const savedOrder = await this.orderRepository.save(order);

      const orderProducts = orderProduct.map((product) =>
        this.orderProductRepository.create({
          ...product,
          orderId: savedOrder,
        }),
      );

      await this.orderProductRepository.save(orderProducts);

      return this.client.send({ cmd: 'create-notification' }, {});
    } catch (error) {
      throw new RpcException({
        message: error.message,
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }

  findAll() {
    return this.orderRepository.find({
      relations: ['orderProduct'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['orderProduct'],
    });

    if (!order) {
      throw new RpcException({
        message: `Order with id #${id} not found`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    const productsId = order.orderProduct;
    const products = await firstValueFrom(
      this.client.send({ cmd: 'validate-product-stock' }, productsId),
    );

    return {
      ...order,
      orderProduct: order.orderProduct.map((product) => ({
        ...product,
        product: products.find((p) => p.id === product.productId),
      })),
    };
  }

  // update(id: number, updateOrderDto: UpdateOrderDto) {
  //   return `This action updates a #${id} order`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} order`;
  // }
}
