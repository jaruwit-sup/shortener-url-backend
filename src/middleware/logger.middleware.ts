import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    res.on('finish', () => {
      const { statusCode } = res;
      const now = new Date().toLocaleString();

      console.log(
        `[Request][${now}]: ${method} ${originalUrl} statusCode ${statusCode}`,
      );
    });
    next();
  }
}
