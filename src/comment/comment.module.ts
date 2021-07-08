import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Notice } from "src/notice/entities/notice.entity";
import { User } from "src/user/entities/user.entity";
import { Verification } from "src/user/entities/verification.entity";
import { CommentResolver } from "./comment.resolver";
import { CommentService } from "./comment.service";
import { Comment } from "./entities/comment.entity";


@Module({
    imports:[TypeOrmModule.forFeature([User, Verification, Notice, Comment])],
    providers:[CommentService, CommentResolver]
})
export class CommentModule {}