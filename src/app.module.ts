import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserService } from './user/user.service';
import * as Joi from 'joi';
import { User } from './user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
      validationSchema: Joi.object({
        NODE_ENV:     Joi.string().valid('dev', 'prod').required(),
        DB_HOST:      Joi.string().required(),
        DB_PORT:      Joi.string().required(),
        DB_USERNAME:  Joi.string().required(),
        DB_PASSWORD:  Joi.string().required(),
        DB_NAME:      Joi.string().required(),
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
      "logging": true,
      entities:[
        User
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    UserModule,
  ],
  controllers: [],
  providers: [UserService],
})
export class AppModule {}
