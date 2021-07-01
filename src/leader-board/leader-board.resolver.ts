import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { AllNamedWodRecordsInput, AllNamedWodRecordsOutput } from "./dtos/all-named-wod-records.dto";
import { AllOneRmRecordsInput, AllOneRmRecordsOutput } from "./dtos/all-one-rm-records.dto";
import { CreateNamedWodRecordInput, CreateNamedWodRecordOutput } from "./dtos/create-named-wod-record.dto";
import { CreateOneRmRecordInput, CreateOneRmRecordOutput } from "./dtos/create-one-rm-record.dto";
import { DeleteNamedWodInput, DeleteNamedWodOutput } from "./dtos/delete-named-wod.dto";
import { DeleteOneRmInput, DeleteOneRmOutput } from "./dtos/delete-one-rm.dto";
import { EditNamedWodRecordInput, EditNamedWodRecordOutput } from "./dtos/edit-named-wod.dto";
import { EditOneRmRecordInput, EditOneRmRecordOutput } from "./dtos/edit-one-rm.dto";
import { MyNamedWodRecordsInput, MyNamedWodRecordsOutput } from "./dtos/my-named-wod-records.dto";
import { MyOneRmRecordsInput, MyOneRmRecordsOutput } from "./dtos/my-one-rm-records.dto";
import { LeaderBoardNamedWod } from "./entities/lb-named-wods.entity";
import { LeaderBoardOneRm } from "./entities/lb-one-rm.entity";
import { LeaderBoardService } from "./leader-board.service";


@Resolver(() => LeaderBoardOneRm)
export class LeaderBoardOneRmResolver {
    constructor(
        private readonly lbService:LeaderBoardService
    ) {}

    @Role(['Any'])
    @Mutation(returns => CreateOneRmRecordOutput)
    async createOneRmRecord(
        @AuthUser() authUser:User,
        @Args('input') createOneRmRecordInput:CreateOneRmRecordInput
    ):Promise<CreateOneRmRecordOutput> {
        return this.lbService.createOneRmRecord(authUser, createOneRmRecordInput);
    }

    @Role(['Any'])
    @Mutation(returns => EditOneRmRecordOutput)
    async editOneRmRecord(
        @AuthUser() authUser:User,
        @Args('input') editOneRmRecordInput:EditOneRmRecordInput
    ):Promise<EditOneRmRecordOutput> {
        return this.lbService.editOneRmRecord(authUser, editOneRmRecordInput);
    }

    @Role(["Any"])
    @Mutation(type => DeleteOneRmOutput)
    async deleteOneRmRecord(
        @AuthUser() authUser:User,
        @Args('input') editOneRmInput:DeleteOneRmInput
    ):Promise<DeleteOneRmOutput> {
        return this.lbService.deleteOneRmRecord(authUser, editOneRmInput);
    }

    @Role(['Any'])
    @Query(returns => AllOneRmRecordsOutput)
    async allOneRmRecords(
        @AuthUser() authUser:User,
        @Args('input') allOneRmRecordsInput:AllOneRmRecordsInput
    ):Promise<AllOneRmRecordsOutput> {
        return this.lbService.allOneRmRecords(authUser, allOneRmRecordsInput);
    }

    @Role(['Any'])
    @Query(returns => MyOneRmRecordsOutput)
    async myOneRmRecords(
        @AuthUser() authUser:User,
        @Args('input') myOneRmRecordsInput:MyOneRmRecordsInput
    ):Promise<MyOneRmRecordsOutput> {
        return this.lbService.myOneRmRecords(authUser, myOneRmRecordsInput);
    }
}

@Resolver(() => LeaderBoardNamedWod)
export class LeaderBoardNamedWodResolver {
    constructor(
        private readonly lbService:LeaderBoardService
    ) {}

    @Role(['Any'])
    @Mutation(returns => CreateNamedWodRecordOutput)
    async createNamedWodRecord(
        @AuthUser() authUser:User,
        @Args('input') createNamedWodRecordInput:CreateNamedWodRecordInput
    ):Promise<CreateNamedWodRecordOutput> {
        return this.lbService.createNamedWodRecord(authUser, createNamedWodRecordInput);
    }

    @Role(['Any'])
    @Mutation(returns => EditNamedWodRecordOutput)
    async editNamedWodRecord(
        @AuthUser() authUser:User,
        @Args('input') editNamedWodRecordInput:EditNamedWodRecordInput
    ):Promise<EditNamedWodRecordOutput> {
        return this.lbService.editNamedWodRecord(authUser, editNamedWodRecordInput);
    }

    @Role(["Any"])
    @Mutation(type => DeleteNamedWodOutput)
    async deleteNamedWodRecord(
        @AuthUser() authUser:User,
        @Args('input') editNamedWodInput:DeleteNamedWodInput
    ):Promise<DeleteNamedWodOutput> {
        return this.lbService.deleteNamedWodRecord(authUser, editNamedWodInput);
    }

    @Role(['Any'])
    @Query(returns => AllNamedWodRecordsOutput)
    async allNamedWodRecords(
        @AuthUser() authUser:User,
        @Args('input') allNamedWodRecordsInput:AllNamedWodRecordsInput
    ):Promise<AllNamedWodRecordsOutput> {
        return this.lbService.allNamedWodRecords(authUser, allNamedWodRecordsInput);
    }

    @Role(['Any'])
    @Query(returns => MyNamedWodRecordsOutput)
    async myNamedWodRecords(
        @AuthUser() authUser:User,
        @Args('input') myNamedWodRecordsInput:MyNamedWodRecordsInput
    ):Promise<MyNamedWodRecordsOutput> {
        return this.lbService.myNamedWodRecords(authUser, myNamedWodRecordsInput);
    }
}
