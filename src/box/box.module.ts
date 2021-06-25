import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBoxResolver } from "./box.resolver";
import { AffiliatedBox } from "./entities/box.entity";


@Module({
    imports:[TypeOrmModule.forFeature([AffiliatedBox])],
    providers:[AffiliatedBoxResolver],
})
export class AffiliatedBoxModule {}