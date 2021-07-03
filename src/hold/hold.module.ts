import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { Hold } from "./entities/hold.entity";
import { HoldResolver } from "./hold.resolver";
import { HoldService } from "./hold.service";


@Module({
    imports:[TypeOrmModule.forFeature([User, Verification, Hold, AffiliatedBox])],
    providers:[HoldService, HoldResolver],
})
export class HoldModule {}