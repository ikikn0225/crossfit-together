import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from 'src/common/common.constants';
import { TokenUser } from 'src/decorators/user.decorator';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: jwtConstants.secret,
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
        secretOrKey: jwtConstants.secret,
        ignoreExpiration: true,
        });
    }

    validate(payload: TokenUser) {
        return { id: payload.id };
    }
}