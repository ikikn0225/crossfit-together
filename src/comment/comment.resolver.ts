import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CommentService } from "./comment.service";
import { AllCommentsInNoticeInput, AllCommentsInNoticeOutput } from "./dtos/comments-in-notice.dto";
import { CreateCommentInNoticeInput, CreateCommentInNoticeOutput } from "./dtos/create-comment-in-notice.dto";
import { DeleteCommentInNoticeInput, DeleteCommentInNoticeOutput } from "./dtos/delete-comment-in-notice.dto";
import { EditCommentInNoticeInput, EditCommentInNoticeOutput } from "./dtos/edit-comment-in-notice.dto";
import { Comment } from "./entities/comment.entity";


@Resolver(() => Comment)
export class CommentResolver {
    constructor( 
        private readonly commentService:CommentService
    ){}

    @Role(["Any"])
    @Mutation(returns => CreateCommentInNoticeOutput)
    async createCommentInNotice (
        @AuthUser() authUser:User,
        @Args('input') createCommentInNoticeInput:CreateCommentInNoticeInput
    ):Promise<CreateCommentInNoticeOutput> {
        return this.commentService.createCommentInNotice(authUser, createCommentInNoticeInput);
    }

    @Role(["Any"])
    @Mutation(returns => EditCommentInNoticeOutput)
    async editCommentInNotice(
        @AuthUser() authUser:User,
        @Args('input') editCommentInNoticeInput:EditCommentInNoticeInput
    ):Promise<EditCommentInNoticeOutput> {
        return this.commentService.editCommentInNotice(authUser, editCommentInNoticeInput);
    }

    @Role(["Any"])
    @Mutation(returns => DeleteCommentInNoticeOutput)
    async deleteCommentInNotice(
        @AuthUser() authUser:User,
        @Args('input') deleteCommentInNoticeInput:DeleteCommentInNoticeInput
    ):Promise<DeleteCommentInNoticeOutput> {
        return this.commentService.deleteCommentInNotice(authUser, deleteCommentInNoticeInput);
    }

    @Role(["Any"])
    @Query(returns => AllCommentsInNoticeOutput)
    async allCommentsInNotice(
        @Args('input') allCommentsInNotice:AllCommentsInNoticeInput
    ):Promise<AllCommentsInNoticeOutput> {
        return this.commentService.allCommentsInNotice(allCommentsInNotice);
    }

}