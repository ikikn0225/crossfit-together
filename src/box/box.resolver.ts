import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AuthGuard } from "src/auth/auth-plus.guard";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { AffiliatedBoxService } from "./box.service";
import { AllAffiliatedBoxesOutput } from "./dtos/all-affiliated-boxes.dto";
import { CreateAffiliatedBoxInput, CreateAffiliatedBoxOutput } from "./dtos/create-box.dto";
import { DeleteAffiliatedBoxOutput } from "./dtos/delete-box.dto";
import { MyAffiliatedBoxUsersOutput } from "./dtos/my-affiliated-box-users.dto";
import { MyAffiliatedBoxOutput } from "./dtos/my-affiliated-box.dto";
import { AffiliatedBox } from "./entities/box.entity";


@Resolver(of => AffiliatedBox)
export class AffiliatedBoxResolver {
    constructor(private readonly boxService:AffiliatedBoxService) {}

    @Role(["Coach"])
    @Mutation(returns => CreateAffiliatedBoxOutput)
    async createAffiliatedBox( 
            @AuthUser() authUser:User,
            @Args('input') createAffiliatedBoxInput:CreateAffiliatedBoxInput,
        ): Promise<CreateAffiliatedBoxOutput> {
        return this.boxService.createAffiliatedBox(authUser, createAffiliatedBoxInput);
    }

    @Role(["Coach"])
    @Mutation(returns => DeleteAffiliatedBoxOutput)
    async deleteAffiliatedBox(@AuthUser() authUser:User ): Promise<DeleteAffiliatedBoxOutput> {
        return this.boxService.deleteAffiliatedBox(authUser);
    }

    @Query(returns => AllAffiliatedBoxesOutput)
    allAffiliatedBoxes() {
        return this.boxService.allAffiliatedBoxes();
    }

    @Role(["Any"])
    @Query(returns => MyAffiliatedBoxOutput)
    @UseGuards(AuthGuard)
    myAffiliatedBox( @AuthUser() authUser:User ):Promise<MyAffiliatedBoxOutput> {
        return this.boxService.myAffiliatedBox(authUser);
    }

    @Role(["Coach"])
    @Query(returns => MyAffiliatedBoxUsersOutput)
    async myAffiliatedBoxUsers( @AuthUser() authUser:User ): Promise<MyAffiliatedBoxUsersOutput> {
        return this.boxService.myAffiliatedBoxUsers(authUser);
    }
}