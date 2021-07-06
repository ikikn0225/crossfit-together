import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Notice } from "../entities/notice.entity";


@InputType()
export class EditNoticeInput extends PickType(PartialType(Notice), [
    'title',
    'contents',
    'coverImg'
]) {
    @Field(type => Int)
    noticeId:number;
}

@ObjectType()
export class EditNoticeOutput extends CoreOutput {}