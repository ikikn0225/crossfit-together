import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { AllHoldsOutput } from "./dtos/all-holds.dto";
import { DeleteHoldInput, DeleteHoldOutput } from "./dtos/delete-hold.dto";
import { MyHoldsOutput } from "./dtos/my-holds.dto";
import { RegisterHoldInput, RegisterHoldOutput } from "./dtos/register-hold.dto";
import { Hold } from "./entities/hold.entity";
import { HoldService } from "./hold.service";


@Resolver(() => Hold)
export class HoldResolver {
    constructor(
        private readonly holdService:HoldService,
    ){}

    @Role(['Crossfiter'])
    @Mutation(returns => RegisterHoldOutput)
    async registerHold(
        @AuthUser() authUser:User,
        @Args('input') registerHoldInput:RegisterHoldInput,
    ):Promise<RegisterHoldOutput> {
        return this.holdService.registerHold(authUser, registerHoldInput);
    }

    @Role(["Any"])
    @Query(returns => AllHoldsOutput)
    allHolds(
        @AuthUser() authUser:User
    ):Promise<AllHoldsOutput> {
        return this.holdService.allHolds(authUser);
    }

    @Role(["Any"])
    @Query(returns => MyHoldsOutput)
    myHolds(
        @AuthUser() authUser:User
    ):Promise<MyHoldsOutput> {
        return this.holdService.myHolds(authUser);
    }

    @Role(["Any"])
    @Mutation(returns => DeleteHoldOutput)
    deleteHold(
        @AuthUser() authUser:User,
        @Args('input') deleteHoldInput:DeleteHoldInput
    ):Promise<DeleteHoldOutput> {
        return this.holdService.deleteHold(authUser, deleteHoldInput);
    }
}