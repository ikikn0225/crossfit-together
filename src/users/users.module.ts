import { Module } from '@nestjs/common';
import { UserResolver } from './users.resolver';

@Module({
    imports:[],
    providers: [UserResolver],
})
export class UsersModule {}
