import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Reply } from "../entities/reply.entity";

@InputType()
export class CreateReplyInNoticeInput extends PickType(Reply, ["content"]){
    @Field(type => Number)
    commentId:number;
}

@ObjectType()
export class CreateReplyInNoticeOutput extends CoreOutput {}