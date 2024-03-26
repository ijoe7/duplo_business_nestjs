import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
console.log(process.env.MONGODB_URI);
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI),
    // MongooseModule.forFeature([
    //   { name: 'MongoEntity', schema: MongoEntitySchema },
    // ]),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
