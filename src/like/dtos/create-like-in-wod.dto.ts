import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";


@InputType()
export class CreateLikeInWodInput {
    @Field(type => Number)
    wodId:number;
}

@ObjectType()
export class CreateLikeInWodOutput extends CoreOutput {}