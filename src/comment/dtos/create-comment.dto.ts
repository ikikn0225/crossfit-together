import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Comment } from "../entities/comment.entity";

@InputType()
export class CreateCommentInput extends PickType(Comment, ["content"]){
    @Field(type => Number)
    noticeId:number;
}

@ObjectType()
export class CreateCommentOutput extends CoreOutput {

}