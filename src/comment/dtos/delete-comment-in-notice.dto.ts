import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Comment } from "../entities/comment.entity";


@InputType()
export class DeleteCommentInNoticeInput extends PickType(Comment, ['id']) {}

@ObjectType()
export class DeleteCommentInNoticeOutput extends CoreOutput {}