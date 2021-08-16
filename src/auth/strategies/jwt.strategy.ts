import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { TokenUser } from 'src/decorators/user.decorator';
import { jwtConstants } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
        });
    }

    validate(payload: TokenUser) {
        return { id: payload.id };
    }
}

@Injectable()
export class ExpriedJwtStrategy extends PassportStrategy(Strategy, 'jwt-expried') {
    constructor() {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_KEY,
        ignoreExpiration: true,
        });
    }

    validate(payload: TokenUser) {
        return { id: payload.id };
    }
}