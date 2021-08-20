import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { PassportModule } from "@nestjs/passport";
// import { JwtModule } from "src/jwt/jwt.module";
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from "src/user/user.module";
import { AuthUserGuard } from "./auth.guard";
import { jwtConstants } from "./constants";
import { ConfigService } from "@nestjs/config";


@Module({
    imports:[UserModule, PassportModule],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthUserGuard,
        },
    ],
})
export class AuthModule{}