import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { CreateLikeOnWodInput, CreateLikeOnWodOutput } from "./dtos/create-like-on-wod.dto";
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
}