import { Field, InputType, Int, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Like } from "../entities/like.entity";


@InputType()
export class DeleteLikeOnWodInput extends PickType(Like, ['id']) {
    @Field(type => Int)
    wodId:number;
}

@ObjectType()
export class DeleteLikeOnWodOutput extends CoreOutput {}