import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderProductDto {
  @IsString()
  @IsNotEmpty()
  productId: number;

  @IsInt()
  @IsNotEmpty()
  quantity: number;
}
