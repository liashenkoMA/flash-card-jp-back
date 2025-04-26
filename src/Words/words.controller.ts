import { Body, Controller, Get, Headers, Patch } from '@nestjs/common';
import { UserServise } from 'src/User/user.service';
import { WordsDTO } from './words.schema.dto';

@Controller('words')
export class WordsController {
  constructor(private readonly userService: UserServise) {}

  @Patch('upload')
  uploadKanji(@Headers('authorization') headers: any, @Body() data: WordsDTO) {
    return this.userService.uploadWords(headers, data);
  }

  @Get('getcategory')
  getCategoryWords(@Headers('authorization') headers: any) {
    return this.userService.getCategoryWords(headers);
  }
}
