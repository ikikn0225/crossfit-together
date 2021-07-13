import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateLikeInWodInput, CreateLikeInWodOutput } from "./dtos/create-like-in-wod.dto";
import { DeleteLikeInWodInput, DeleteLikeInWodOutput } from "./dtos/delete-like-in-wod.dto";
import { AllLikesInWodInput, AllLikesInWodOutput } from "./dtos/likes-in-wod.dto";
import { Like } from "./entities/like.entity";
import { LikeService } from "./like.service";


@Resolver(() => Like)
export class LikeResolver {
    constructor( 
        private readonly likeService:LikeService
    ){}

    @Role(['Any'])
    @Mutation(returns => CreateLikeInWodOutput)
    async createLikeInWod(
        @AuthUser() authUser:User,
        @Args('input') createLikeInWodInput:CreateLikeInWodInput
    ):Promise<CreateLikeInWodOutput> {
        return this.likeService.createLikeInWod(authUser, createLikeInWodInput);
    }

    @Role(['Any'])
    @Query(returns => AllLikesInWodOutput)
    async allLikesInWod(
        @AuthUser() authUser:User,
        @Args('input') allLikesInWodInput:AllLikesInWodInput
    ):Promise<AllLikesInWodOutput> {
        return this.likeService.allLikesInWod(allLikesInWodInput);
    }

    @Role(['Any'])
    @Mutation(returns => DeleteLikeInWodOutput)
    async deleteLikeInWod(
        @AuthUser() authUser:User,
        @Args('input') deleteLikeInWodInput:DeleteLikeInWodInput
    ):Promise<DeleteLikeInWodOutput> {
        return this.likeService.deleteLikeInWod(authUser, deleteLikeInWodInput);
    }
}