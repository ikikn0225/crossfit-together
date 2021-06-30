import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Bor } from "../entities/board-of-record.entity";


@InputType()
export class EditBorInput extends PickType(PartialType(Bor), [
    'content'
]) {
    @Field(type => Number)
    borId:number;
}

@ObjectType()
export class EditBorOutput extends CoreOutput {}