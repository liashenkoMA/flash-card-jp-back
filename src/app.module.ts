import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './User/user.module';
import { AuthModule } from './Auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/'),
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
