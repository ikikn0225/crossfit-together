import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { LeaderBoardNamedWod } from "../entities/lb-named-wods.entity";


@InputType()
export class CreateNamedWodRecordInput extends PickType(LeaderBoardNamedWod, ['namedWod', 'record']) {}

@ObjectType()
export class CreateNamedWodRecordOutput extends CoreOutput {}