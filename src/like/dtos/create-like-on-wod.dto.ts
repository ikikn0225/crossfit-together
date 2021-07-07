import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";


@InputType()
export class CreateLikeOnWodInput {
    @Field(type => Number)
    wodId:number;
}

@ObjectType()
export class CreateLikeOnWodOutput extends CoreOutput {}