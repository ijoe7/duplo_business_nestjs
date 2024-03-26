export class CreateOrderDto {
  businessId: string;
  departmentId: string;
  items: {
    itemName: string;
    quantity: number;
    unitPrice: number;
  }[];
  totalAmount: number;
  credit?: boolean;
}
