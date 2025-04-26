import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Words {
  @Prop()
  category: string;
  @Prop()
  word: string;
  @Prop()
  translate: string;
  @Prop()
  learn: boolean;
}
export const WordsSchema = SchemaFactory.createForClass(Words);
