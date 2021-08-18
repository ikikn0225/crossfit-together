import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
// import { JwtModule } from "src/jwt/jwt.module";
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from "src/user/user.module";
import { AuthUserGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategies/local.strategy";
import { ExpriedJwtStrategy, JwtStrategy } from "./strategies/jwt.strategy";
import { AuthResolver } from "./auth.resolver";
import { jwtConstants } from "./constants";
import { ConfigService } from "@nestjs/config";


@Module({
    imports:[UserModule, PassportModule, JwtModule.register({ secret: jwtConstants.secret }), ConfigService],
    providers: [AuthService, LocalStrategy, JwtStrategy, ExpriedJwtStrategy, AuthResolver,
        {
            provide: APP_GUARD,
            useClass: AuthUserGuard,
        },
    ],
    exports: [AuthService],
})
export class AuthModule{}