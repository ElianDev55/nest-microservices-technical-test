import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { IOrderProduct } from './interface/order-produc.interface';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productsRepository.create(createProductDto);

    try {
      return this.productsRepository.save(product);
    } catch (error) {
      throw new RpcException({
        message: 'Product not created',
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return product;
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productsRepository.findOne({
      where: { id },
    });

    if (!product) {
      throw new RpcException({
        message: `Product with id #${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    return product;
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    delete updateProductDto.id;
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new RpcException({
        message: `Product with id #${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    try {
      this.productsRepository.update(id, updateProductDto);
    } catch (error) {
      throw new RpcException({
        message: `Product with id #${id} not updated`,
        status: HttpStatus.BAD_REQUEST,
      });
    }
    return {
      message: `Product with id #${id} updated successfully`,
      status: HttpStatus.OK,
    };
  }

  async remove(id: number) {
    const product = await this.productsRepository.findOne({ where: { id } });
    if (!product) {
      throw new RpcException({
        message: `Product with id #${id} not found`,
        status: HttpStatus.NOT_FOUND,
      });
    }

    try {
      this.productsRepository.remove(product);
    } catch (error) {
      throw new RpcException({
        message: `Product with id #${id} not deleted`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    return {
      message: `Product with id #${id} deleted successfully`,
      status: HttpStatus.OK,
    };
  }

  async validateProductStock(data: IOrderProduct[]) {
    const ids = data.map((item) => item.productId);
    const products = await this.productsRepository.findByIds(ids);

    if (products.length !== ids.length) {
      throw new RpcException({
        message: 'Some products not found',
        status: HttpStatus.NOT_FOUND,
      });
    }

    for (const item of data) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new RpcException({
          message: `Product with id #${item.productId} not found`,
          status: HttpStatus.NOT_FOUND,
        });
      }
      if (product.initial_stock < item.quantity) {
        throw new RpcException({
          message: `Product with id #${product.id} does not have enough stock`,
          status: HttpStatus.BAD_REQUEST,
        });
      }
    }

    return products;
  }
}
