import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Bor } from "../entities/board-of-record.entity";


@InputType()
export class DeleteBorInput extends PickType(Bor, ['id']) {}

@ObjectType()
export class DeleteBorOutput extends CoreOutput {}