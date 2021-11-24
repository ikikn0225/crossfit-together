import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { FreeTrial } from "../entities/ft.entity";

@InputType()
export class AllDistinctFreeTrialsInput {
    @Field(type => Number, {nullable:true})
    affiliatedBoxId?:number;
}

@ObjectType()
export class AllDistinctHFreeTrialsOutput extends CoreOutput {
    @Field(type => [FreeTrial], {nullable:true})
    freeTrials?:FreeTrial[];
}