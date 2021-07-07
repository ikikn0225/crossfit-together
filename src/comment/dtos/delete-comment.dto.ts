import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Comment } from "../entities/comment.entity";


@InputType()
export class DeleteCommentInput extends PickType(Comment, ['id']) {}

@ObjectType()
export class DeleteCommentOutput extends CoreOutput {}