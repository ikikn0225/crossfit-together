import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateReplyInNoticeInput, CreateReplyInNoticeOutput } from "./dtos/create-reply-in-notice.dto";
import { DeleteReplyInNoticeInput, DeleteReplyInNoticeOutput } from "./dtos/delete-reply-in-notice.dto";
import { EditReplyInNoticeInput, EditReplyInNoticeOutput } from "./dtos/edit-reply-in-notice.dto";
import { AllRepliesInNoticeInput, AllRepliesInNoticeOutput } from "./dtos/replies-in-notice.dto";
import { Reply } from "./entities/reply.entity";
import { ReplyService } from "./reply.service";


@Resolver(() => Reply)
export class ReplyResolver {
    constructor( 
        private readonly replyService:ReplyService
    ){}

    @Role(['Any'])
    @Mutation(returns => CreateReplyInNoticeOutput)
    async createReplyInNotice (
        @AuthUser() authUser:User,
        @Args('input') createReplyInput:CreateReplyInNoticeInput
    ):Promise<CreateReplyInNoticeOutput> {
        return this.replyService.createReplyInNotice(authUser, createReplyInput);
    }

    @Role(['Any'])
    @Mutation(returns => EditReplyInNoticeOutput)
    async editReplyInNotice(
        @AuthUser() authUser:User,
        @Args('input') editReplyInNoticeInput:EditReplyInNoticeInput
    ):Promise<EditReplyInNoticeOutput> {
        return this.replyService.editReplyInNotice(authUser, editReplyInNoticeInput);
    }

    @Role(['Any'])
    @Mutation(returns => DeleteReplyInNoticeOutput)
    async deleteReplyInNotice(
        @AuthUser() authUser:User,
        @Args('input') deleteReplyInNoticeInput:DeleteReplyInNoticeInput
    ):Promise<DeleteReplyInNoticeOutput> {
        return this.replyService.deleteReplyInNotice(authUser, deleteReplyInNoticeInput);
    }

    @Role(['Any'])
    @Query(returns => AllRepliesInNoticeOutput)
    repliesInNotice(
        @Args('input') allRepliesInNoticeInput:AllRepliesInNoticeInput
    ):Promise<AllRepliesInNoticeOutput> {
        return this.replyService.repliesInNotice(allRepliesInNoticeInput);
    }

}