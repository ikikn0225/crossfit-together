import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Reply } from "../entities/reply.entity";


@InputType()
export class DeleteReplyInNoticeInput extends PickType(Reply, ['id']) {}

@ObjectType()
export class DeleteReplyInNoticeOutput extends CoreOutput {}