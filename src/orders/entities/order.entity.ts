import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Item } from './item.entity'; // Assuming you have an Item entity

@Entity()
export class Order extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // orderId: string;

  @Column()
  businessId: string;

  @Column()
  departmentId: string;

  @OneToMany(() => Item, (item) => item.order, { cascade: true })
  items: Array<{
    itemName: string;
    quantity: number;
    unitPrice: number;
  }>;

  @Column()
  totalAmount: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
