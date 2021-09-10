import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorService } from 'src/board-of-record/board-of-record.service';
import { Bor } from 'src/board-of-record/entities/board-of-record.entity';
import { AffiliatedBoxService } from 'src/box/box.service';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { Like } from 'src/like/entities/like.entity';
import { User } from 'src/user/entities/user.entity';
import { Category } from './entities/category.entity';
import { Wod } from './entities/wod.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryResolver, WodResolver } from './wod.resolver';
import { WodService } from './wod.service';

@Module({
    imports:[TypeOrmModule.forFeature([Wod, User, AffiliatedBox, Bor, Like, CategoryRepository])],
    providers: [WodResolver, WodService, AffiliatedBoxService, CategoryResolver],
})
export class WodModule {}
