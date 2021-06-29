import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Wod } from "../entities/wod.entity";
import { CreateWodInput } from "./create-wod.dto";


@InputType()
export class EditWodInput extends PickType(PartialType(Wod), [
    'title',
    'content'
]) {
    @Field(type => Int)
    wodId:number;
}

@ObjectType()
export class EditWodOutput extends CoreOutput {}