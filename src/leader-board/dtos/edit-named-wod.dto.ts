import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { LeaderBoardNamedWod } from "../entities/lb-named-wods.entity";


@InputType()
export class EditNamedWodRecordInput extends PickType(PartialType(LeaderBoardNamedWod), [
    'record'
]) {
    @Field(type => Int)
    namedWodId:number;
}

@ObjectType()
export class EditNamedWodRecordOutput extends CoreOutput {}