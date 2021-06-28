import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import * as Joi from 'joi';
import { User } from './user/entities/user.entity';
import { CommonModule } from './common/common.module';
import { JwtModule } from './jwt/jwt.module';
import { JwtMiddleware } from './jwt/jwt.middleware';
import { Verification } from './user/entities/verification.entity';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';
import { Wod } from './wod/entities/wod.entity';
import { AffiliatedBox } from './box/entities/box.entity';
import { AffiliatedBoxModule } from './box/box.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      validationSchema: Joi.object({
        NODE_ENV:             Joi.string().valid('dev', 'prod').required(),
        DB_HOST:              Joi.string().required(),
        DB_PORT:              Joi.string().required(),
        DB_USERNAME:          Joi.string().required(),
        DB_PASSWORD:          Joi.string().required(),
        DB_NAME:              Joi.string().required(),
        PRIVATE_KEY:          Joi.string().required(),
        SENDGRID_API_KEY:     Joi.string().required(),
        SENDGRID_FROM_EMAIL:  Joi.string().required(),
        SENDGRID_TEMPLATE_ID: Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      "type": "postgres",
      "host": process.env.DB_HOST,
      "port": +process.env.DB_PORT,
      "username": process.env.DB_USERNAME,
      "password": process.env.DB_PASSWORD,
      "database": process.env.DB_NAME,
      "synchronize": process.env.NODE_ENV !== 'prod',
      "logging": process.env.NODE_ENV !== 'prod',
      entities:[ User, Verification, AffiliatedBox, Wod ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req, connection }) => {
        const TOKEN_KEY = 'x-jwt';
        return {
          token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
        }
      },
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
    }),
    MailModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
      fromEmail: process.env.SENDGRID_FROM_EMAIL,
      templateId: process.env.SENDGRID_TEMPLATE_ID,
    }),
    AuthModule,
    UserModule,
    AffiliatedBoxModule,
    CommonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes({ path:'/graphql', method: RequestMethod.POST });
  }
}
