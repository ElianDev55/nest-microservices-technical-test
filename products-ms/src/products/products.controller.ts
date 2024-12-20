import { Body, Controller, HttpStatus } from '@nestjs/common';
import { MessagePattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { IOrderProduct } from './interface/order-produc.interface';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @MessagePattern({ cmd: 'create-product' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'find-all-products' })
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern({ cmd: 'find-one-product' })
  findOne(@Payload('id') id: string) {
    const orderId = Number(id);
    if (isNaN(orderId)) {
      throw new RpcException({
        message: `Order with id #${id} not conrrerted to number`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return this.productsService.findOne(+id);
  }

  @MessagePattern({ cmd: 'update-product' })
  update(@Payload() UpdateProductDto: UpdateProductDto) {
    return this.productsService.update(UpdateProductDto.id, UpdateProductDto);
  }

  @MessagePattern({ cmd: 'remove-product' })
  remove(@Payload('id') id: string) {
    const orderId = Number(id);
    if (isNaN(orderId)) {
      throw new RpcException({
        message: `Order with id #${id} not conrrerted to number`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return this.productsService.remove(+id);
  }

  @MessagePattern({ cmd: 'validate-product-stock' })
  validateProductStock(@Payload() data: IOrderProduct[]) {
    return this.productsService.validateProductStock(data);
  }
}
