import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'src/login/util/token';
import getRole from 'src/utils/check_admin';

@Injectable()
export class HistoryMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('HistoryMiddleware');
    const payload = verifyToken(req.headers.authorization);
    if (getRole(payload.role) === 'admin' || payload.id === req.params.id) {
      next();
    }
    throw new ForbiddenException('Forbidden');
  }
}
