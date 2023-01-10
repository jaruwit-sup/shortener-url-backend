import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from 'src/entities/url.entity';
import { Repository } from 'typeorm';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { generate } from 'shortid';
import { configService } from '../config/config.service';
import { autoAddProtocol, isUrl } from 'src/utils/url.util';

@Injectable()
export class UrlsService {
  constructor(
    @InjectRepository(Url, 'postgres')
    private repository: Repository<Url>,
  ) {}

  async create(url: Url): Promise<Url> {
    return this.repository.save(url);
  }

  async findOne(id: string): Promise<Url> {
    return this.repository.findOneBy({ id });
  }

  async shorten(createShortUrlDto: CreateShortUrlDto): Promise<Url> {
    // auto add protocol in case user submit url without protocol
    const urlWithProtocol: string = autoAddProtocol(createShortUrlDto.longUrl);

    // checks if URL is not valid
    if (!isUrl(urlWithProtocol)) {
      throw new BadRequestException('URL is not valid.');
    }

    const id = generate();
    const baseUrl = configService.getBaseUrl();
    const url = new Url();
    url.id = id;
    url.longUrl = urlWithProtocol;
    url.shortUrl = `${baseUrl}/urls/${id}`;
    return await this.create(url);
  }
}
