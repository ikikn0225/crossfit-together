import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { AllFreeTrialOutput } from "./dtos/all-free-trial.dto";
import { CreateFreeTrialInput, CreateFreeTrialOutput } from "./dtos/create-free-trial.dto";
import { DeleteFreeTrialInput, DeleteFreeTrialOutput } from "./dtos/delete-free-trial.dto";
import { FreeTrial } from "./entities/ft.entity";
import { FreeTrialService } from "./free-trial.service";


@Resolver(() => FreeTrial)
export class FreeTrialResolver {
    constructor(
        private readonly freeTrialService:FreeTrialService,
    ){}

    @Role(["Any"])
    @Mutation(returns => CreateFreeTrialOutput)
    async createFreeTrial(
        @AuthUser() authUser:User,
        @Args('input') freeTrialInput:CreateFreeTrialInput,
    ):Promise<CreateFreeTrialOutput> {
        return this.freeTrialService.createFreeTrial(authUser, freeTrialInput);
    }

    @Role(["Any"])
    @Query(returns => AllFreeTrialOutput)
    async allFreeTrial(
        @AuthUser() authUser:User
    ):Promise<AllFreeTrialOutput> {
        return this.freeTrialService.allFreeTrial(authUser);
    }

    @Role(["Any"])
    @Mutation(returns => DeleteFreeTrialOutput)
    deleteFreeTrial(
        @AuthUser() authUser:User,
        @Args('input') deleteFreeTrialInput:DeleteFreeTrialInput
    ):Promise<DeleteFreeTrialOutput> {
        return this.freeTrialService.deleteFreeTrial(authUser, deleteFreeTrialInput);
    }
}