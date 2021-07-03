import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { LeaderBoardNamedWod } from "../entities/lb-named-wods.entity";

@InputType()
export class MyNamedWodRecordsInput extends PickType(LeaderBoardNamedWod, ['namedWod']) {}

@ObjectType()
export class MyNamedWodRecordsOutput extends CoreOutput {
    @Field(type => [LeaderBoardNamedWod], {nullable:true})
    lbNamedWods?:LeaderBoardNamedWod[];
}