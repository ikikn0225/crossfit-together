import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { FreeTrial } from "./entities/ft.entity";
import { FreeTrialResolver } from "./free-trial.resolver";
import { FreeTrialService } from "./free-trial.service";


@Module({
    imports:[TypeOrmModule.forFeature([User, Verification, FreeTrial, AffiliatedBox])],
    providers:[FreeTrialService, FreeTrialResolver],
})
export class FreeTrialModule {}