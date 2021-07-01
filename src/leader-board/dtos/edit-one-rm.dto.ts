import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { LeaderBoardOneRm } from "../entities/lb-one-rm.entity";


@InputType()
export class EditOneRmRecordInput extends PickType(PartialType(LeaderBoardOneRm), [
    'record'
]) {
    @Field(type => Int)
    oneRmId:number;
}

@ObjectType()
export class EditOneRmRecordOutput extends CoreOutput {}