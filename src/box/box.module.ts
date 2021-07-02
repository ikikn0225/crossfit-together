import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Hold } from "src/hold/entities/hold.entity";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { UserService } from "src/user/user.service";
import { AffiliatedBoxResolver } from "./box.resolver";
import { AffiliatedBoxService } from "./box.service";
import { AffiliatedBox } from "./entities/box.entity";


@Module({
    imports:[TypeOrmModule.forFeature([AffiliatedBox, User, Verification, Hold])],
    providers: [AffiliatedBoxResolver, AffiliatedBoxService, UserService],
})
export class AffiliatedBoxModule {}