import { IsUrl } from 'class-validator';
export class CreateShortUrlDto {
  @IsUrl(undefined, { message: 'URL is not valid.' })
  longUrl: string;
}
