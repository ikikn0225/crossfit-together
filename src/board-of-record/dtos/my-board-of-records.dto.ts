import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "src/user/entities/user.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Bor } from "../entities/board-of-record.entity";


@InputType()
export class MyBoardofRecordInput extends PickType(Wod, ['id']) {
    @Field(type => Number)
    userId?:number;
}

@ObjectType()
export class MyBoardofRecordOutput extends CoreOutput {
    @Field(type => [Bor])
    bors?:Bor[];
}