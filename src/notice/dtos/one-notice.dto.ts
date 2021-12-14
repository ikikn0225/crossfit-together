import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Notice } from "../entities/notice.entity";

@InputType()
export class OneNoticeInput {
    @Field(type => Int)
    noticeId:number;
}

@ObjectType()
export class OneNoticeOutput extends CoreOutput {
    @Field(type => Notice, { nullable:true })
    notice?: Notice;
}