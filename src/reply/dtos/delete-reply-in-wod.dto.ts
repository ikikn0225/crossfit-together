import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Reply } from "../entities/reply.entity";


@InputType()
export class DeleteReplyInWodInput extends PickType(Reply, ['id']) {}

@ObjectType()
export class DeleteReplyInWodOutput extends CoreOutput {}