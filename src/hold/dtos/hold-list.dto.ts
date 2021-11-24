import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { HoldEdge, HoldPageInfo } from "../entities/hold.entity";


@InputType()
export class HoldListInput {
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
export class HoldListOutput extends CoreOutput {
    @Field(type => [HoldEdge], { nullable:true })
    edges?:HoldEdge[];

    @Field(type => HoldPageInfo, { nullable:true })
    pageInfo?:HoldPageInfo;
}