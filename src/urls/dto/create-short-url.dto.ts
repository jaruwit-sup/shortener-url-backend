import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
export class CreateShortUrlDto {
  @ApiProperty({ example: 'https://google.com' })
  @IsUrl(undefined, { message: 'URL is not valid.' })
  longUrl: string;
}
