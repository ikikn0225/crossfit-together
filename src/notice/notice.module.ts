import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { Notice } from "./entities/notice.entity";
import { NoticeResolver } from "./notice.resolver";
import { NoticeService } from "./notice.service";


@Module({
    imports:[TypeOrmModule.forFeature([User, Verification, AffiliatedBox, Notice])],
    providers:[NoticeResolver, NoticeService]
})
export class NoticeModule {}