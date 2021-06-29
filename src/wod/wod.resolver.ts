import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { Repository } from "typeorm";
import { AllWodsOutput } from "./dtos/all-wods.dto";
import { CreateWodInput, CreateWodOutput } from "./dtos/create-wod.dto";
import { DeleteWodInput, DeleteWodOutput } from "./dtos/delete-wod.dto";
import { EditWodInput, EditWodOutput } from "./dtos/edit-wod.dto";
import { Wod } from "./entities/wod.entity";
import { WodService } from "./wod.service";


@Resolver(() => Wod)
export class WodResolver {
    constructor( private readonly wodService:WodService ){}

    @Role(["Coach"])
    @Mutation(type => CreateWodOutput)
    async createWod(
        @AuthUser() authUser:User,
        @Args('input') createWodInput:CreateWodInput
    ):Promise<CreateWodOutput> {
        return this.wodService.createWod(authUser, createWodInput);
    }

    @Role(["Coach"])
    @Mutation(type => EditWodOutput)
    async editWod(
        @AuthUser() authUser:User,
        @Args('input') editWodInput:EditWodInput
    ):Promise<EditWodOutput> {
        return this.wodService.editWod(authUser, editWodInput);
    }

    @Role(["Coach"])
    @Mutation(type => DeleteWodOutput)
    async deleteWod(
        @AuthUser() authUser:User,
        @Args('input') editWodInput:DeleteWodInput
    ):Promise<DeleteWodOutput> {
        return this.wodService.deleteWod(authUser, editWodInput);
    }

    @Role(["Any"])
    @Query(type => AllWodsOutput)
    async allWods():Promise<AllWodsOutput> {
        return this.wodService.allWods();
    }
}