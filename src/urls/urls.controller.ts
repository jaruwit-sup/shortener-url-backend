import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('/shorten')
  async shorten(@Body() createShortUrlDto: CreateShortUrlDto) {
    return this.urlsService.shorten(createShortUrlDto);
  }

  @Get(':id')
  async redirect(@Param('id') id: string, @Res() res) {
    const longUrl: string = await this.urlsService.getLongUrl(id);
    return res.redirect(longUrl);
  }
}
