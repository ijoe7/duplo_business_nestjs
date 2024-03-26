import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://dbSegun:segun1234@cluster0.7bb8dcz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    ),
    // MongooseModule.forFeature([
    //   { name: 'MongoEntity', schema: MongoEntitySchema },
    // ]),
  ],
  exports: [MongooseModule],
})
export class MongoModule {}
