import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Hold } from "../entities/hold.entity";


@InputType()
export class DeleteHoldInput extends PickType(Hold, ['id']) {}

@ObjectType()
export class DeleteHoldOutput extends CoreOutput {}