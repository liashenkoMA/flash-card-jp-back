import { Controller, Headers, Body, Patch } from '@nestjs/common';
import { KanjiDTO } from './kanji.schema.dto';
import { UserServise } from 'src/User/user.service';

@Controller('kanji')
export class KanjiController {
  constructor(private readonly userService: UserServise) {}

  @Patch('upload')
  uploadKanji(@Headers('authorization') headers: any, @Body() data: KanjiDTO) {
    return this.userService.uploadKanji(headers, data);
  }
}
