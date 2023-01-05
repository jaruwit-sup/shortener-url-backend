import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getPort() {
    return process.env.PORT;
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      name: 'postgres',
      type: 'postgres',
      host: this.env.POSTGRES_HOST,
      port: parseInt(this.env.POSTGRES_PORT),
      username: this.env.POSTGRES_USER,
      password: this.env.POSTGRES_PASSWORD,
      database: this.env.POSTGRES_DATABASE,
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
      logging: true,
      ssl: true,
    };
  }
}

const configService = new ConfigService(process.env);

export { configService };
