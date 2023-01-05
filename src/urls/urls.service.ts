import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Url } from 'src/entities/url.entity';
import { Repository } from 'typeorm';
import { CreateShortUrlDto } from './dto/create-short-url.dto';
import { generate } from 'shortid';
import { configService } from '../config/config.service';

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
    const id = generate();
    const baseUrl = configService.getBaseUrl();
    const url = new Url();
    url.id = id;
    url.longUrl = createShortUrlDto.longUrl;
    url.shortUrl = `${baseUrl}/urls/${id}`;
    return await this.create(url);
  }

  async getLongUrl(id: string): Promise<string> {
    const url: Url = await this.findOne(id);
    return url.longUrl;
  }
}
