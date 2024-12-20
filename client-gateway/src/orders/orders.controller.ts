import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly ordersClient: ClientProxy,
  ) {}

  @Post()
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send({ cmd: 'create-order' }, createOrderDto),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Get()
  getAllOrder() {
    return this.ordersClient.send({ cmd: 'find-all-orders' }, {});
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const order = await firstValueFrom(
        this.ordersClient.send({ cmd: 'find-one-order' }, { id }),
      );

      return order;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
  //   return; //
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return; //
  // }
}
