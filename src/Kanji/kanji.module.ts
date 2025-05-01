import { Module } from '@nestjs/common';
import { KanjiController } from './kanji.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Kanji, KanjiSchema } from './kanji.schema';
import { UserModule } from 'src/User/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Kanji.name, schema: KanjiSchema }]),
    UserModule,
  ],
  controllers: [KanjiController],
})
export class KanjiModule {}
