import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bor } from 'src/board-of-record/entities/board-of-record.entity';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { FreeTrial } from 'src/free-trial/entities/ft.entity';
import { Hold } from 'src/hold/entities/hold.entity';
import { LeaderBoardNamedWod } from 'src/leader-board/entities/lb-named-wods.entity';
import { LeaderBoardOneRm } from 'src/leader-board/entities/lb-one-rm.entity';
import { User } from './entities/user.entity';
import { Verification } from './entities/verification.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
    //forFeature() method to define which repositories are registered in the current scope
    imports:[TypeOrmModule.forFeature([User, Verification, AffiliatedBox, Bor, LeaderBoardOneRm, LeaderBoardNamedWod, Hold, FreeTrial])],
    providers: [UserResolver, UserService],
    exports:[UserService],
})
export class UserModule {}
