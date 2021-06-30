import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role-decorator";
import { User } from "src/user/entities/user.entity";
import { BorService } from "./board-of-record.service";
import { CreateBorInput, CreateBorOutput } from "./dtos/create-record.dto";
import { DeleteBorInput, DeleteBorOutput } from "./dtos/delete-record.dto";
import { EditBorInput, EditBorOutput } from "./dtos/edit-record.dto";
import { RecordListInput, RecordListOutput } from "./dtos/record-list.dto";
import { Bor } from "./entities/board-of-record.entity";


@Resolver(() => Bor)
export class BorResolver {
    constructor(
        private readonly borService:BorService
    ) {}

    @Role(['Any'])
    @Mutation(type => CreateBorOutput)
    async createBor(
        @AuthUser() user:User,
        @Args('input') createBor:CreateBorInput
    ):Promise<CreateBorOutput> {
        return this.borService.createBor(user, createBor);
    }

    @Role(['Any'])
    @Mutation(type => EditBorOutput)
    async editBor(
        @AuthUser() authUser:User,
        @Args('input') editBorInput:EditBorInput
    ):Promise<EditBorOutput> {
        return this.borService.editBor(authUser, editBorInput);
    }

    @Role(['Any'])
    @Mutation(type => DeleteBorOutput)
    async deleteBor(
        @AuthUser() authUser:User,
        @Args('input') deleteBorInput:DeleteBorInput
    ):Promise<DeleteBorOutput> {
        return this.borService.deleteBor(authUser, deleteBorInput);
    }

    @Role(['Any'])
    @Query(type => RecordListOutput)
    async recordList(
        @Args('input') recordListInput:RecordListInput
    ):Promise<RecordListOutput> {
        return this.borService.recordList(recordListInput);
    }
}