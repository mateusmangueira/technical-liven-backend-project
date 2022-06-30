import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { default as jwtConstants } from '../constants';

interface JwtPayload {
  sub: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants().secret,
    });
  }

  async validate(payload: JwtPayload): Promise<any> {
    const { sub } = payload;
    return { ...payload, id: sub };
  }
}
