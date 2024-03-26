import { Injectable } from '@nestjs/common';
// import { CreateTransactionDto } from './dto/create-transaction.dto';
// import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction } from './entities/transaction.schema';
import { startOfDay, endOfDay } from 'date-fns';
// import { Transaction } from './interfaces/transaction.interfaces';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
  ) {}

  async findAllByBusinessId(businessId: string): Promise<Transaction[]> {
    return this.transactionModel.find({ businessId }).lean();
  }

  async findTodayByBusinessId(businessId: string): Promise<Transaction[]> {
    // const today = new Date();
    // today.setHours(0, 0, 0, 0);
    // const tomorrow = new Date(today);
    // tomorrow.setDate(tomorrow.getDate() + 1);
    const today = new Date();
    const startOfToday = startOfDay(today);
    const endOfToday = endOfDay(today);
    return this.transactionModel
      .find({ businessId, createdAt: { $gte: startOfToday, $lt: endOfToday } })
      .lean();
  }
}
