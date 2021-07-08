import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Comment } from "../entities/comment.entity";

@InputType()
export class CreateCommentInNoticeInput extends PickType(Comment, ["content"]){
    @Field(type => Number)
    noticeId:number;
}

@ObjectType()
export class CreateCommentInNoticeOutput extends CoreOutput {

}