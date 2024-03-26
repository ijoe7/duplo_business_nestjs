import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CatDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  // @Prop()
  // transactionId: string;

  @Prop()
  orderId: string;

  @Prop()
  businessId: string;

  @Prop()
  departmentId: string;

  @Prop()
  totalAmount: number;

  @Prop({ default: Date.now })
  date: Date;

  @Prop()
  credit: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
