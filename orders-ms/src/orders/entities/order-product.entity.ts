import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('order-products')
export class OrderProduct {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  productId: number;

  @Column({ type: 'int' })
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderProduct, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'orderId' })
  orderId: Order;
}
