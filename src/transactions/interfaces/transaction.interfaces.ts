export interface Transaction {
  transactionId: string;
  orderId: string;
  businessId: string;
  departmentId: string;
  totalAmount: number;
  timestamp: Date;
}
