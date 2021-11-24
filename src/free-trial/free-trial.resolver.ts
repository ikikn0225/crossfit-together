import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { AllFreeTrialOutput } from "./dtos/all-free-trial.dto";
import { AllSpecificFreeTrialsInput, AllSpecificFreeTrialsOutput } from "./dtos/all-specific-free-trials.dto";
import { RegisterFreeTrialInput, RegisterFreeTrialOutput } from "./dtos/register-free-trial.dto";
import { DeleteFreeTrialInput, DeleteFreeTrialOutput } from "./dtos/delete-free-trial.dto";
import { FreeTrialListOutput } from "./dtos/free-trial-list.dto";
import { FreeTrial } from "./entities/ft.entity";
import { FreeTrialService } from "./free-trial.service";
import { MyFreeTrialInput, MyFreeTrialOutput } from "./dtos/my-free-trial.dto";


@Resolver(() => FreeTrial)
export class FreeTrialResolver {
    constructor(
        private readonly freeTrialService:FreeTrialService,
    ){}

    @Role(["Any"])
    @Mutation(returns => RegisterFreeTrialOutput)
    async registerFreeTrial(
        @AuthUser() authUser:User,
        @Args('input') freeTrialInput:RegisterFreeTrialInput,
    ):Promise<RegisterFreeTrialOutput> {
        return this.freeTrialService.registerFreeTrial(authUser, freeTrialInput);
    }

    @Role(["Any"])
    @Query(returns => AllFreeTrialOutput)
    async allFreeTrial(
        @AuthUser() authUser:User
    ):Promise<AllFreeTrialOutput> {
        return this.freeTrialService.allFreeTrial(authUser);
    }

    @Role(["Any"])
    @Query(type => FreeTrialListOutput)
    async distinctFreeTrialList(
        @AuthUser() authUser:User,
        @Args('first', { type: () => Int, nullable:true }) first?:number,
        @Args('after', { type: () => Int, nullable:true }) after?:number,
    ):Promise<FreeTrialListOutput> {
        return this.freeTrialService.distinctFreeTrialList(authUser, first, after);
    }

    @Role(["Any"])
    @Query(returns => AllSpecificFreeTrialsOutput)
    allSpecificFreeTrials(
        @AuthUser() authUser:User,
        @Args('input') allFreeTrialsInput:AllSpecificFreeTrialsInput,
    ):Promise<AllSpecificFreeTrialsOutput> {
        return this.freeTrialService.allSpecificFreeTrials(authUser, allFreeTrialsInput);
    }

    @Role(["Any"])
    @Mutation(returns => DeleteFreeTrialOutput)
    deleteFreeTrial(
        @AuthUser() authUser:User,
        @Args('input') deleteFreeTrialInput:DeleteFreeTrialInput
    ):Promise<DeleteFreeTrialOutput> {
        return this.freeTrialService.deleteFreeTrial(authUser, deleteFreeTrialInput);
    }

    @Role(["Any"])
    @Query(returns => MyFreeTrialOutput)
    myFreeTrial(
        @AuthUser() authUser:User,
        @Args('input') myFreeTrialInput:MyFreeTrialInput,
    ):Promise<MyFreeTrialOutput> {
        return this.freeTrialService.myFreeTrial(authUser, myFreeTrialInput);
    }
}