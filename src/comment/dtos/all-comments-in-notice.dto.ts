import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Comment } from "../entities/comment.entity";

@InputType()
export class AllCommentsInNoticeInput {
    @Field(type => Number)
    noticeId:number;
}

@ObjectType()
export class AllCommentsInNoticeOutput extends CoreOutput {
    @Field(type => [Comment], {nullable:true})
    comments?:Comment[];
}