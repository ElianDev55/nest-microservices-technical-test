import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderProductDto } from './create-order-product';

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {}
