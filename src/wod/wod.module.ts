import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliatedBoxService } from 'src/box/box.service';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { User } from 'src/user/entities/user.entity';
import { Wod } from './entities/wod.entity';
import { WodResolver } from './wod.resolver';
import { WodService } from './wod.service';

@Module({
    imports:[TypeOrmModule.forFeature([Wod, User, AffiliatedBox])],
    providers: [WodResolver, WodService, AffiliatedBoxService],
})
export class WodModule {}
