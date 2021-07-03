import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { LeaderBoardOneRm } from "../entities/lb-one-rm.entity";


@InputType()
export class CreateOneRmRecordInput extends PickType(LeaderBoardOneRm, ['oneRm', 'record']) {}

@ObjectType()
export class CreateOneRmRecordOutput extends CoreOutput {}