import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyToken } from 'src/login/util/token';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('AuthMiddleware');
    const token = req.headers.authorization;
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }
    const payload = verifyToken(token);
    if (!payload) {
      throw new UnauthorizedException('Token not found');
    }
    
    next();
  }
}
