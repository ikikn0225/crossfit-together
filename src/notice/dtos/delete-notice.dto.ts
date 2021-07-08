

import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";

@InputType()
export class DeleteNoticeInput{
    @Field(type => Int)
    noticeId:number;
}

@ObjectType()
export class DeleteNoticeOutput extends CoreOutput {}