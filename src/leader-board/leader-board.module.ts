import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { LeaderBoardNamedWod } from "./entities/lb-named-wods.entity";
import { LeaderBoardOneRm } from "./entities/lb-one-rm.entity";
import { LeaderBoardNamedWodResolver, LeaderBoardOneRmResolver } from "./leader-board.resolver";
import { LeaderBoardService } from "./leader-board.service";


@Module({
    imports:[TypeOrmModule.forFeature([User, Verification, AffiliatedBox, LeaderBoardOneRm, LeaderBoardNamedWod])],
    providers:[LeaderBoardService, LeaderBoardOneRmResolver, LeaderBoardNamedWodResolver]
})
export class LeaderBoardModule {}