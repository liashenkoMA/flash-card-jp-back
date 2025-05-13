import { Controller, Headers, Body, Patch, Get } from '@nestjs/common';
import { KanjiDTO } from './kanji.schema.dto';
import { UserServise } from 'src/User/user.service';

@Controller('kanji')
export class KanjiController {
  constructor(private readonly userService: UserServise) {}

  @Patch('upload')
  uploadKanji(
    @Headers('authorization') headers: string,
    @Body() data: KanjiDTO,
  ) {
    return this.userService.uploadKanji(headers, data);
  }

  @Get()
  getKanji(@Headers('authorization') headers: string) {
    return this.userService.getKanji(headers);
  }

  @Patch('update')
  updateKanji(
    @Headers('authorization') headers: string,
    @Body() data: { kanji: KanjiDTO },
  ) {
    return this.userService.updateKanji(headers, data);
  }

  @Patch('delete')
  deleteKanji(
    @Headers('authorization') headers: string,
    @Body() data: { kanji: KanjiDTO },
  ) {
    return this.userService.deleteKanji(headers, data);
  }
}
