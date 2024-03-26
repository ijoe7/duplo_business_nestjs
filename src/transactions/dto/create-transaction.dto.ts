export class CreateTransactionDto {
  transactionId: string;
  orderId: string;
  businessId: string;
  departmentId: string;
  totalAmount: number;
  timestamp: Date;
}
