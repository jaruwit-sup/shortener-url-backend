import { Controller, Get, Post, Body, Param, Res } from '@nestjs/common';
import { UrlsService } from './urls.service';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { Url } from 'src/entities/url.entity';
import { Response } from 'express';

@Controller('urls')
export class UrlsController {
  constructor(private readonly urlsService: UrlsService) {}

  @Post('/shorten')
  async shorten(@Body() createShortUrlDto: CreateShortUrlDto) {
    return this.urlsService.shorten(createShortUrlDto);
  }

  @Get(':id')
  async redirect(@Res() res: Response, @Param('id') id: string) {
    const url: Url = await this.urlsService.findOne(id);
    return res.redirect(url.longUrl);
  }
}
