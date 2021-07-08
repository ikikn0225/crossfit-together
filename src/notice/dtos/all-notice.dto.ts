import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Notice } from "../entities/notice.entity";


@ObjectType()
export class AllNoticeOutput extends CoreOutput {
    @Field(type => [Notice], {nullable:true})
    notices?:Notice[];
}