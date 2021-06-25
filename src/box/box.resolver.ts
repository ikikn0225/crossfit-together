import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { AffiliatedBoxService } from "./box.service";
import { CreateAffiliatedBoxInput, CreateAffiliatedBoxOutput } from "./dtos/create-box.dto";
import { AffiliatedBox } from "./entities/box.entity";


Resolver(of => AffiliatedBox)
export class AffiliatedBoxResolver {

    constructor(
        private readonly boxService:AffiliatedBoxService,
    ) {}

    @Mutation(returns => CreateAffiliatedBoxOutput)
    @Role(["Coach"])
    async createAffiliatedBox( 
            @AuthUser() authUser:User,
            @Args('input') createAffiliatedBoxInput:CreateAffiliatedBoxInput,
        ): Promise<CreateAffiliatedBoxOutput> {
        return this.boxService.createAffiliatedBox(authUser, createAffiliatedBoxInput);
    }
}