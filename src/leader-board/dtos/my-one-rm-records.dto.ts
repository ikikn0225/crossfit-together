import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { LeaderBoardOneRm } from "../entities/lb-one-rm.entity";

@InputType()
export class MyOneRmRecordsInput extends PickType(LeaderBoardOneRm, ['oneRm']) {}

@ObjectType()
export class MyOneRmRecordsOutput extends CoreOutput {
    @Field(type => LeaderBoardOneRm, {nullable:true})
    lbOneRms?:LeaderBoardOneRm;
}