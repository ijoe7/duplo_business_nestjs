import {
  BadRequestException,
  NotFoundException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from '../transactions/entities/transaction.schema';
import { Order } from './entities/order.entity';
import { Item } from './entities/item.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderWithItemsDto } from './dto/order-with-items.dto';
import { startOfDay, endOfDay } from 'date-fns';
import { calculateCreditScore } from '../helpers/calculateCreditScore';
import axios from 'axios';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<OrderWithItemsDto> {
    // Validate if items array is provided
    if (!createOrderDto.items || createOrderDto.items.length === 0) {
      throw new BadRequestException('Items array is required');
    }

    const order = new Order();
    order.businessId = createOrderDto.businessId;
    order.departmentId = createOrderDto.departmentId;
    order.items = createOrderDto.items; // Assign items directly

    // Calculate total amount based on items
    order.totalAmount = createOrderDto.items.reduce(
      (total, item) => total + item.quantity * item.unitPrice,
      0,
    );

    const savedOrder = await this.orderRepository.save(order);

    // const items = createOrderDto.items.map((item) => {
    //   const newItem = new Item();
    //   newItem.itemName = item.itemName;
    //   newItem.quantity = item.quantity;
    //   newItem.unitPrice = item.unitPrice;
    //   newItem.order = savedOrder;
    //   return newItem;
    // });
    // console.log(items);

    // await this.itemRepository.save(items);

    const data = {
      orderId: savedOrder.id,
      businessId: savedOrder.businessId,
      departmentId: savedOrder.departmentId,
      totalAmount: savedOrder.totalAmount,
      credit: createOrderDto?.credit ? createOrderDto.credit : false,
    };
    const transaction = await this.transactionModel.create(data);

    return this.mapOrderWithItemsDto(savedOrder, transaction);
  }

  async logTax(data): Promise<unknown> {
    const apiUrl = 'https://taxes.free.beeceptor.com/log-tax';
    const timeoutMs = 30000; // 30 seconds

    const { businessId } = data;
    const orders = await this.orderRepository.find({
      where: { businessId },
      relations: ['items'],
    });
    console.log(orders);
    try {
      const response = await axios.post(apiUrl, orders, { timeout: timeoutMs });
      return response.data;
    } catch (error) {
      // Handle potential errors
      if (axios.isAxiosError(error)) {
        // Axios error
        console.error('Axios error:', error.message);
      } else {
        // Other error
        console.error('Error:', error.message);
      }
      throw error;
    }
  }

  async calculateCreditScore(businessId: string): Promise<Record<string, any>> {
    const orders = await this.orderRepository.find({
      where: { businessId },
      relations: ['items'],
    });
    const transaction = await this.transactionModel.find({ businessId }).lean();
    const creditScore = calculateCreditScore(orders, transaction);
    return {
      businessId,
      creditScore,
    };
  }

  async getOrdersByBusiness(businessId: string): Promise<OrderWithItemsDto[]> {
    const orders = await this.orderRepository.find({
      where: { businessId },
      relations: ['items'],
    });
    // return orders.map((order) => this.mapOrderWithItemsDto(order));
    return this.mapOrdersWithItemsDto(orders);
  }

  async getOrdersTodayByBusiness(
    businessId: string,
  ): Promise<OrderWithItemsDto[]> {
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);

    const orders = await this.orderRepository.find({
      where: {
        businessId,
        timestamp: Between(startOfToday, endOfToday),
      },
      relations: ['items'],
    });
    if (!orders || orders?.length === 0)
      throw new NotFoundException('No orders found');
    // return orders.map((order) => this.mapOrderWithItemsDto(order));
    return this.mapOrdersWithItemsDto(orders);
  }

  private mapOrderWithItemsDto(
    order: Order,
    transaction: Transaction,
  ): OrderWithItemsDto {
    return {
      id: order.id,
      businessId: order.businessId,
      departmentId: order.departmentId,
      items: order.items,
      totalAmount: order.totalAmount,
      timestamp: order.timestamp,
      transaction,
    };
  }

  private mapOrdersWithItemsDto(orders: Order[]): OrderWithItemsDto[] {
    let totalAmount = 0;
    orders.forEach((order) => {
      totalAmount += order.totalAmount;
    });
    const totalNumberOfOrders = orders.length;

    return orders.map((order) => ({
      id: order.id,
      businessId: order.businessId,
      departmentId: order.departmentId,
      items: order.items,
      totalAmount: order.totalAmount,
      timestamp: order.timestamp,
      totalNumberOfOrders,
      totalAmountOfOrders: totalAmount,
    }));
  }
}
