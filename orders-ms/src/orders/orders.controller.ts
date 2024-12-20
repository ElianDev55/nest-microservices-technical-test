import {
  Controller,
  HttpStatus,
  NotImplementedException,
} from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller()
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @MessagePattern({ cmd: 'create-order' })
  create(@Payload() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @MessagePattern({ cmd: 'find-all-orders' })
  findAll() {
    return this.ordersService.findAll();
  }

  @MessagePattern({ cmd: 'find-one-order' })
  findOne(@Payload('id') id: string) {
    const orderId = Number(id);
    if (isNaN(orderId)) {
      throw new RpcException({
        message: `Order with id #${id} not conrrerted to number`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return this.ordersService.findOne(orderId);
  }

  @MessagePattern({ cmd: 'update-order' })
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    throw new NotImplementedException();
  }

  @MessagePattern({ cmd: 'remove-order' })
  remove(@Payload() id: number) {
    throw new NotImplementedException();
  }
}
