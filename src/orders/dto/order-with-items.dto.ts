import { Transaction } from '../../transactions/entities/transaction.schema';

export class OrderWithItemsDto {
  id: number;
  businessId: string;
  departmentId: string;
  items: {
    itemName: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  timestamp: Date;
  transaction?: Transaction;
}
