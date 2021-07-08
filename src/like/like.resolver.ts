import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateLikeOnWodInput, CreateLikeOnWodOutput } from "./dtos/create-like-on-wod.dto";
import { DeleteLikeOnWodInput, DeleteLikeOnWodOutput } from "./dtos/delete-like-on-wod.dto";
import { AllLikesOnWodInput, AllLikesOnWodOutput } from "./dtos/likes-on-wod.dto";
import { Like } from "./entities/like.entity";
import { LikeService } from "./like.service";


@Resolver(() => Like)
export class LikeResolver {
    constructor( 
        private readonly likeService:LikeService
    ){}

    @Role(['Any'])
    @Mutation(returns => CreateLikeOnWodOutput)
    async createLikeOnWod(
        @AuthUser() authUser:User,
        @Args('input') createLikeOnWodInput:CreateLikeOnWodInput
    ):Promise<CreateLikeOnWodOutput> {
        return this.likeService.createLikeOnWod(authUser, createLikeOnWodInput);
    }

    @Role(['Any'])
    @Query(returns => AllLikesOnWodOutput)
    async allLikesOnWod(
        @AuthUser() authUser:User,
        @Args('input') allLikesOnWodInput:AllLikesOnWodInput
    ):Promise<AllLikesOnWodOutput> {
        return this.likeService.allLikesOnWod(allLikesOnWodInput);
    }

    @Role(['Any'])
    @Mutation(returns => DeleteLikeOnWodOutput)
    async deleteLikeOnWod(
        @AuthUser() authUser:User,
        @Args('input') deleteLikeOnWodInput:DeleteLikeOnWodInput
    ):Promise<DeleteLikeOnWodOutput> {
        return this.likeService.deleteLikeOnWod(authUser, deleteLikeOnWodInput);
    }
}