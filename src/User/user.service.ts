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
import { KanjiDTO } from 'src/Kanji/kanji.schema.dto';
import { WordsDTO } from 'src/Words/words.schema.dto';

@Injectable()
export class UserServise {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private async validateAndGetPayload(headers: string) {
    const token = headers?.startsWith('Bearer ')
      ? headers.replace('Bearer ', '')
      : null;

    if (!token) {
      throw new UnauthorizedException('Не авторизованы');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_CONSTANT,
      });
      return payload;
    } catch {
      throw new UnauthorizedException('Невалидный токен');
    }
  }

  async createUser(user: UserDTO): Promise<{ data: string }> {
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

    await createUser.save();

    return {
      data: user.email,
    };
  }

  async getUser(headers: string): Promise<{ email: string }> {
    const payload = await this.validateAndGetPayload(headers);

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

  async uploadKanji(
    headers: string,
    data: KanjiDTO,
  ): Promise<{ message: string }> {
    const { username: email } = await this.validateAndGetPayload(headers);

    const kanji = { ...data, learn: true };

    await this.userModel
      .updateOne(
        { email },
        {
          $push: { kanji: kanji },
        },
      )
      .exec();

    return { message: 'Добавлено' };
  }

  async uploadWords(
    headers: string,
    data: WordsDTO,
  ): Promise<{ message: string }> {
    const { username: email } = await this.validateAndGetPayload(headers);

    const words = { ...data, learn: true };

    await this.userModel
      .updateOne(
        { email },
        {
          $push: { words: words },
        },
      )
      .exec();

    return { message: 'Добавлено' };
  }

  async getCategoryWords(headers: string): Promise<string[]> {
    const { username: email } = await this.validateAndGetPayload(headers);

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const categories = [...new Set(user.words.map((word) => word.category))];

    return categories;
  }

  async getKanji(headers: string): Promise<KanjiDTO[]> {
    const { username: email } = await this.validateAndGetPayload(headers);

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const kanjiList = user.kanji;
    return kanjiList;
  }

  async getWords(headers: string): Promise<WordsDTO[]> {
    const { username: email } = await this.validateAndGetPayload(headers);

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    const wordsList = user.words;
    return wordsList;
  }

  async updateKanji(
    headers: string,
    data: { kanji: KanjiDTO },
  ): Promise<{ message: string }> {
    const { username: email } = await this.validateAndGetPayload(headers);

    if (data.kanji.learn) {
      await this.userModel.updateOne(
        {
          email,
          'kanji.kanji': data.kanji.kanji,
        },
        { $set: { 'kanji.$.learn': false } },
      );

      return { message: 'Кандзи изучен' };
    } else {
      await this.userModel.updateOne(
        {
          email,
          'kanji.kanji': data.kanji.kanji,
        },
        { $set: { 'kanji.$.learn': true } },
      );

      return { message: 'Кандзи не изучен' };
    }
  }

  async updateWord(
    headers: string,
    data: { word: WordsDTO },
  ): Promise<{ message: string }> {
    const { username: email } = await this.validateAndGetPayload(headers);

    if (data.word.learn) {
      await this.userModel.updateOne(
        {
          email,
          'words.word': data.word.word,
        },
        { $set: { 'words.$.learn': false } },
      );

      return { message: 'Слово изучено' };
    } else {
      await this.userModel.updateOne(
        {
          email,
          'words.word': data.word.word,
        },
        { $set: { 'words.$.learn': true } },
      );

      return { message: 'Слово не изучено' };
    }
  }

  async deleteKanji(
    headers: string,
    data: { kanji: KanjiDTO },
  ): Promise<{ message: string }> {
    const { username: email } = await this.validateAndGetPayload(headers);

    await this.userModel.updateOne(
      {
        email,
      },
      { $pull: { kanji: { kanji: data.kanji.kanji } } },
    );

    return { message: 'Кандзи удалено' };
  }

  async deleteWord(
    headers: string,
    data: { word: WordsDTO },
  ): Promise<{ message: string }> {
    const { username: email } = await this.validateAndGetPayload(headers);

    await this.userModel.updateOne(
      {
        email,
      },
      { $pull: { words: { word: data.word.word } } },
    );

    return { message: 'Слово удалено' };
  }
}
