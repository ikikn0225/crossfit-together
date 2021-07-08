import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CommentService } from "./comment.service";
import { AllCommentsInNoticeInput, AllCommentsInNoticeOutput } from "./dtos/comments-in-notice.dto";
import { CreateCommentInput, CreateCommentOutput } from "./dtos/create-comment.dto";
import { DeleteCommentInput, DeleteCommentOutput } from "./dtos/delete-comment.dto";
import { EditCommentInput, EditCommentOutput } from "./dtos/edit-comment.dto";
import { Comment } from "./entities/comment.entity";


@Resolver(() => Comment)
export class CommentResolver {
    constructor( 
        private readonly commentService:CommentService
    ){}

    @Role(['Any'])
    @Mutation(returns => CreateCommentOutput)
    async createComment (
        @AuthUser() authUser:User,
        @Args('input') createCommentInput:CreateCommentInput
    ):Promise<CreateCommentOutput> {
        return this.commentService.createComment(authUser, createCommentInput);
    }

    @Role(['Any'])
    @Mutation(returns => EditCommentOutput)
    async editComment(
        @AuthUser() authUser:User,
        @Args('input') editCommentInput:EditCommentInput
    ):Promise<EditCommentOutput> {
        return this.commentService.editComment(authUser, editCommentInput);
    }

    @Role(['Any'])
    @Mutation(returns => DeleteCommentOutput)
    async deleteComment(
        @AuthUser() authUser:User,
        @Args('input') deleteCommentInput:DeleteCommentInput
    ):Promise<DeleteCommentOutput> {
        return this.commentService.deleteComment(authUser, deleteCommentInput);
    }

    @Role(['Any'])
    @Query(returns => AllCommentsInNoticeOutput)
    async allCommentsInNotice(
        @Args('input') allCommentsInNotice:AllCommentsInNoticeInput
    ):Promise<AllCommentsInNoticeOutput> {
        return this.commentService.allCommentsInNotice(allCommentsInNotice);
    }

}