import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Wod } from "../entities/wod.entity";


@InputType()
export class CreateWodInput extends PickType(Wod, ["title", "content", "titleDate"]) {
    @Field(type => Number)
    categoryId:number;
}

@ObjectType()
export class CreateWodOutput extends CoreOutput {}