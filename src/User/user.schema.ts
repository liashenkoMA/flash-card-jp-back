import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Kanji, KanjiSchema } from 'src/Kanji/kanji.schema';
import { Words, WordsSchema } from 'src/Words/words.schema';
import { isEmail } from 'validator';

@Schema()
export class User {
  @Prop({
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  })
  name: string;

  @Prop({
    unique: true,
    required: true,
    validate: [isEmail, 'Некорректный email'],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [WordsSchema], default: [] })
  words: Words[];

  @Prop({ type: [KanjiSchema], default: [] })
  kanji: Kanji[];
}

export const UserSchema = SchemaFactory.createForClass(User);
