import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    //forFeature() method to define which repositories are registered in the current scope
    imports:[TypeOrmModule.forFeature([User])],
    providers: [UserResolver, UserService],
    exports:[UserService],
})
export class UserModule {}
