import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { Item } from '../orders/entities/item.entity';
// import { DataSource } from 'typeorm';

console.log(
  process.env.POSTGRES_USERNAME,
  process.env.POSTGRES_PASSWORD,
  process.env.POSTGRES_DB,
);
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.POSTGRES_USERNAME,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [Order, Item],
      synchronize: true,
      autoLoadEntities: true,
    }),
  ],
  exports: [TypeOrmModule],
})
export class PostgresModule {
  // constructor(private dataSource: DataSource) {}
}
