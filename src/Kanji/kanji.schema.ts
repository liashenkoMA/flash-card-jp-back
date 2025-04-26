import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Kanji {
  @Prop()
  kanji: string;
  @Prop()
  translate: string;
  @Prop()
  jpRead: string;
  @Prop()
  chinaRead: string;
  @Prop()
  learn: boolean;
}
export const KanjiSchema = SchemaFactory.createForClass(Kanji);
