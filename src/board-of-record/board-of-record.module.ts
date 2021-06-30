import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { UserService } from "src/user/user.service";
import { Wod } from "src/wod/entities/wod.entity";
import { BorResolver } from "./board-of-record.resolver";
import { BorService } from "./board-of-record.service";
import { Bor } from "./entities/board-of-record.entity";


@Module({
    imports:[TypeOrmModule.forFeature([Bor, Wod, User, Verification])],
    providers: [BorResolver, BorService, UserService],
})
export class BorModule {}