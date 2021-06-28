import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBoxResolver } from "./box.resolver";
import { AffiliatedBoxService } from "./box.service";
import { AffiliatedBox } from "./entities/box.entity";


@Module({
    imports:[TypeOrmModule.forFeature([AffiliatedBox])],
    providers:[AffiliatedBoxResolver, AffiliatedBoxService],
})
export class AffiliatedBoxModule {}