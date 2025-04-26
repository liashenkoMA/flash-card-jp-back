import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from 'src/User/user.module';
import { Words, WordsSchema } from './words.schema';
import { WordsController } from './words.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Words.name, schema: WordsSchema }]),
    UserModule,
  ],
  controllers: [WordsController],
})
export class WordsModule {}
