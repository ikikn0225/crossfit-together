import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bor } from 'src/board-of-record/entities/board-of-record.entity';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    //forFeature() method to define which repositories are registered in the current scope
    imports:[TypeOrmModule.forFeature([User, Verification, Bor])],
    providers: [UserResolver, UserService],
    exports:[UserService],
})
export class UserModule {}
