import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorService } from 'src/board-of-record/board-of-record.service';
import { Bor } from 'src/board-of-record/entities/board-of-record.entity';
import { AffiliatedBoxService } from 'src/box/box.service';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { Notice } from 'src/notice/entities/notice.entity';
import { User } from 'src/user/entities/user.entity';
import { Reply } from './entities/reply.entity';
import { ReplyResolver } from './reply.resolver';
import { ReplyService } from './reply.service';

@Module({
    imports:[TypeOrmModule.forFeature([User, Notice, Reply, Comment])],
    providers: [ReplyResolver, ReplyService],
})
export class ReplyModule {}
