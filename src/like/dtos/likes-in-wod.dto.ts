import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Like } from "../entities/like.entity";

@InputType()
export class AllLikesInWodInput {
    @Field(type => Number)
    wodId:number;
}

@ObjectType()
export class AllLikesInWodOutput extends CoreOutput {
    @Field(type => [Like], {nullable:true})
    likes?:Like[];
}