import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './orders/orders.module';
import { TransactionsModule } from './transactions/transactions.module';
import { MongoModule } from './databases/mongo.module';
import { PostgresModule } from './databases/postgres.module';

@Module({
  imports: [OrdersModule, TransactionsModule, MongoModule, PostgresModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
