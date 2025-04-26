import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { AuthModule } from './Auth/auth.module';
import { KanjiModule } from './Kanji/kanji.module';
import { WordsModule } from './Words/words.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),
    UserModule,
    AuthModule,
    KanjiModule,
    WordsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
