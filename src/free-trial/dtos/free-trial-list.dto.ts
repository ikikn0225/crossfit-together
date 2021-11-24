import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { FreeTrialEdge, FreeTrialPageInfo } from "../entities/ft.entity";


@InputType()
export class FreeTrialListInput {
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
export class FreeTrialListOutput extends CoreOutput {
    @Field(type => [FreeTrialEdge], { nullable:true })
    edges?:FreeTrialEdge[];

    @Field(type => FreeTrialPageInfo, { nullable:true })
    pageInfo?:FreeTrialPageInfo;
}