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
import { WodModule } from './wod/wod.module';
import { BorModule } from './board-of-record/board-of-record.module';
import { Bor } from './board-of-record/entities/board-of-record.entity';
import { LeaderBoardOneRm } from './leader-board/entities/lb-one-rm.entity';
import { LeaderBoardModule } from './leader-board/leader-board.module';
import { LeaderBoardNamedWod } from './leader-board/entities/lb-named-wods.entity';
import { Hold } from './hold/entities/hold.entity';
import { HoldModule } from './hold/hold.module';
import { FreeTrial } from './free-trial/entities/ft.entity';
import { FreeTrialModule } from './free-trial/free-trial.module';
import { Notice } from './notice/entities/notice.entity';
import { NoticeModule } from './notice/notice.module';
import { Comment } from './comment/entities/comment.entity';
import { CommentModule } from './comment/comment.module';
import { Like } from './like/entities/like.entity';
import { LikeModule } from './like/like.module';
import { Reply } from './reply/entities/reply.entity';
import { ReplyModule } from './reply/reply.module';
import { UploadsModule } from './uploads/uploads.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      ignoreEnvFile: process.env.NODE_ENV === 'production',
      validationSchema: Joi.object({
        NODE_ENV:             Joi.string().valid('dev', 'production', 'test').required(),
        DB_HOST:              Joi.string(),
        DB_PORT:              Joi.string(),
        DB_USERNAME:          Joi.string(),
        DB_PASSWORD:          Joi.string(),
        DB_NAME:              Joi.string(),
        PRIVATE_KEY:          Joi.string().required(),
        SENDGRID_API_KEY:     Joi.string().required(),
        SENDGRID_FROM_EMAIL:  Joi.string().required(),
        SENDGRID_TEMPLATE_ID: Joi.string().required(),
        AWS_KEY:              Joi.string().required(),
        AWS_SECRET:           Joi.string().required(),
        JWT_SECRET_KEY:       Joi.string().required(),
        JWT_HEADER:           Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      "type": "postgres",
      ...(process.env.DATABASE_URL 
        ? {url:process.env.DATABASE_URL} 
        : {
            host: process.env.DB_HOST, 
            port: +process.env.DB_PORT, 
            username: process.env.DB_USERNAME, 
            password: process.env.DB_PASSWORD, 
            database: process.env.DB_NAME, 
          }),
      "synchronize": process.env.NODE_ENV !== 'prod',
      "logging": process.env.NODE_ENV !== 'prod',
      entities:[ User, Verification, AffiliatedBox, Wod, Bor, LeaderBoardOneRm, LeaderBoardNamedWod, Hold, FreeTrial, Notice, Comment, Like, Reply ]
    }),
    GraphQLModule.forRoot({
      playground: process.env.NODE_ENV !== 'production',
      installSubscriptionHandlers:true,
      autoSchemaFile: true,
      // context: ({ req, connection, res }) => {
      //     // const TOKEN_KEY = 'x-jwt';
      //   return {
      //     headers: req.headers,
      //     // token: req ? req.headers[TOKEN_KEY] : connection.context[TOKEN_KEY],
      //   }
      // },
      // context:(ctx) => ({...ctx}),
      context: ({ req, res }) => ({ headers: req.headers, res }),
    }),
    JwtModule.forRoot({
      privateKey: process.env.PRIVATE_KEY,
      secret: process.env.JWT_SECRET_KEY,
      header: process.env.JWT_HEADER,
    }),
    MailModule.forRoot({
      apiKey: process.env.SENDGRID_API_KEY,
      fromEmail: process.env.SENDGRID_FROM_EMAIL,
      templateId: process.env.SENDGRID_TEMPLATE_ID,
    }),
    AuthModule,
    UserModule,
    AffiliatedBoxModule,
    WodModule,
    BorModule,
    LeaderBoardModule,
    HoldModule,
    FreeTrialModule,
    NoticeModule,
    CommentModule,
    LikeModule,
    ReplyModule,
    CommonModule,
    UploadsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
