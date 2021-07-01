import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { LeaderBoardNamedWod } from "../entities/lb-named-wods.entity";


@InputType()
export class AllNamedWodRecordsInput extends PickType(LeaderBoardNamedWod, ['namedWod']) {}

@ObjectType()
export class AllNamedWodRecordsOutput extends CoreOutput {
    @Field(type => [LeaderBoardNamedWod], {nullable:true})
    lbNamedWods?:LeaderBoardNamedWod[];
}