import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop()
  words: string[];

  @Prop()
  kanji: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

/* 
  @Prop(
    raw({
      category: { type: String, require: true },
      word: { type: String, require: true },
      translation: { type: String, require: true },
    }),
  )
  words: {
    category: string;
    word: string;
    translation: string;
  }[];

  @Prop(
    raw({
      kanji: { type: String, require: true },
      translation: { type: String, require: true },
      jap: { type: String },
      cny: { type: String },
    }),
  )
  kanji: {
    kanji: string;
    translation: string;
    jap: string;
    cny: string;
  }[];
   */
