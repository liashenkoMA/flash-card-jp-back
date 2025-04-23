import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './user.schema.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserServise {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(user: UserDTO) {
    const oldUser = await this.userModel.findOne({ email: user.email }).exec();

    if (oldUser) {
      throw new ConflictException('Почта уже используется');
    }

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(user.password, salt);

    const createUser = new this.userModel({
      name: user.name,
      email: user.email,
      password: password,
      words: [],
      kanji: [],
    });

    createUser.save();

    return {
      data: user.email,
    };
  }

  async getUser(headers) {
    const token = headers.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Не авторизованы');
    }

    const payload = await this.jwtService.verifyAsync(token, {
      secret: process.env.JWT_CONSTANT,
    });

    const user = await this.userModel
      .findOne({ email: payload.username })
      .exec();

    if (!user) {
      throw new UnauthorizedException('Пользователя не существует');
    }

    return {
      email: user.email,
    };
  }
}
