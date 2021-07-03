import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Hold } from "src/hold/entities/hold.entity";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { UserService } from "src/user/user.service";
import { Wod } from "src/wod/entities/wod.entity";
import { BorResolver } from "./board-of-record.resolver";
import { BorService } from "./board-of-record.service";
import { Bor } from "./entities/board-of-record.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Bor, AffiliatedBox, Wod, User, Verification, Hold])],
    providers: [BorResolver, BorService, UserService],
})
export class BorModule {}