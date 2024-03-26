import { Controller, Get, Param } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.schema';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':businessId')
  async findAllByBusinessId(
    @Param('businessId') businessId: string,
  ): Promise<Transaction[]> {
    return this.transactionsService.findAllByBusinessId(businessId);
  }

  @Get('today/:businessId')
  async findTodayByBusinessId(
    @Param('businessId') businessId: string,
  ): Promise<Transaction[]> {
    return this.transactionsService.findTodayByBusinessId(businessId);
  }
}
