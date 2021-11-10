import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Wod } from "src/wod/entities/wod.entity";
import { Bor } from "../entities/board-of-record.entity";


@InputType()
export class CreateBorInput extends PickType(Bor, ['content']) {

    @Field(type => Number)
    wodId:number;

}

@ObjectType()
export class CreateBorOutput extends CoreOutput {

    @Field(type => Number)
    borId?:number;
}