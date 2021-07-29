import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Reply } from "../entities/reply.entity";

@InputType()
export class AllRepliesInNoticeInput {
    @Field(type => Number)
    commentId:number;
}

@ObjectType()
export class AllRepliesInNoticeOutput extends CoreOutput {
    @Field(type => [Reply], {nullable:true})
    replies?:Reply[];
}