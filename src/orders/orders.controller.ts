import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { OrderWithItemsDto } from './dto/order-with-items.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderWithItemsDto> {
    return this.ordersService.createOrder(createOrderDto);
  }

  @Get('calculateCreditScore/:businessId')
  async calculateCreditScore(
    @Param('businessId') businessId: string,
  ): Promise<Record<string, any>> {
    return this.ordersService.calculateCreditScore(businessId);
  }

  @Get(':businessId')
  async getOrders(
    @Param('businessId') businessId: string,
  ): Promise<OrderWithItemsDto[]> {
    return this.ordersService.getOrdersByBusiness(businessId);
  }

  @Get('today/:businessId/')
  async getOrdersToday(
    @Param('businessId') businessId: string,
  ): Promise<OrderWithItemsDto[]> {
    return this.ordersService.getOrdersTodayByBusiness(businessId);
  }

  @Post('logTax')
  async logTax(@Body() data) {
    return this.ordersService.logTax(data);
  }
}
