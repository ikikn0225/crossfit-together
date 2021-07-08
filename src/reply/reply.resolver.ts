import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateReplyInWodInput, CreateReplyInWodOutput } from "./dtos/create-reply-in-wod.dto";
import { DeleteReplyInWodInput, DeleteReplyInWodOutput } from "./dtos/delete-reply-in-wod.dto";
import { EditReplyInWodInput, EditReplyInWodOutput } from "./dtos/edit-reply-in-wod.dto";
import { Reply } from "./entities/reply.entity";
import { ReplyService } from "./reply.service";


@Resolver(() => Reply)
export class ReplyResolver {
    constructor( 
        private readonly replyService:ReplyService
    ){}

    @Role(['Any'])
    @Mutation(returns => CreateReplyInWodOutput)
    async createReplyInWod (
        @AuthUser() authUser:User,
        @Args('input') createReplyInput:CreateReplyInWodInput
    ):Promise<CreateReplyInWodOutput> {
        return this.replyService.createReplyInWod(authUser, createReplyInput);
    }

    @Role(['Any'])
    @Mutation(returns => EditReplyInWodOutput)
    async editReplyInWod(
        @AuthUser() authUser:User,
        @Args('input') editReplyInWodInput:EditReplyInWodInput
    ):Promise<EditReplyInWodOutput> {
        return this.replyService.editReplyInWod(authUser, editReplyInWodInput);
    }

    @Role(['Any'])
    @Mutation(returns => DeleteReplyInWodOutput)
    async deleteReplyInWod(
        @AuthUser() authUser:User,
        @Args('input') deleteReplyInWodInput:DeleteReplyInWodInput
    ):Promise<DeleteReplyInWodOutput> {
        return this.replyService.deleteReplyInWod(authUser, deleteReplyInWodInput);
    }

}