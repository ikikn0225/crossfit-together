import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { NoticeEdge, NoticePageInfo } from "../entities/notice.entity";

@InputType()
export class NoticeListInput {
    @Field(type => Number, {nullable:true})
    first?:number;

    @Field(type => Number, {nullable:true})
    after?:number;

    @Field(type => Boolean, {nullable:true})
    delay?:boolean;

    @Field(type => Number, {nullable:true})
    affiliatedBoxId?:number;
}

@ObjectType()
export class NoticeListOutput extends CoreOutput {
    @Field(type => [NoticeEdge], { nullable:true })
    edges?:NoticeEdge[];

    @Field(type => NoticePageInfo, { nullable:true })
    pageInfo?:NoticePageInfo;
}