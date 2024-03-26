import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity'; // Assuming you have an Order entity

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, (order) => order.items)
  @JoinColumn()
  order!: Order;

  @Column()
  itemName: string;

  @Column()
  quantity: number;

  @Column()
  unitPrice: number;
}
