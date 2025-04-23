import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserServise } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UserController],
  providers: [UserServise],
  exports: [UserServise],
})
export class UserModule {}
