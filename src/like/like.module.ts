import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Like } from "./entities/like.entity";
import { LikeResolver } from "./like.resolver";
import { LikeService } from "./like.service";


@Module({
    imports:[TypeOrmModule.forFeature([User, Verification, Like, Wod])],
    providers:[LikeService, LikeResolver]
})
export class LikeModule {}