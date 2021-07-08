import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Comment } from "../entities/comment.entity";


@InputType()
export class EditCommentInNoticeInput extends PickType(PartialType(Comment), [
    'content'
]) {
    @Field(type => Number)
    commentId:number;
}

@ObjectType()
export class EditCommentInNoticeOutput extends CoreOutput {}