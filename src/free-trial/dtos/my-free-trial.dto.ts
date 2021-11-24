import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { FreeTrial } from "../entities/ft.entity";


@InputType()
export class MyFreeTrialInput {
    @Field(type => Number, {nullable:true})
    affiliatedBoxId?:number;
}

@ObjectType()
export class MyFreeTrialOutput extends CoreOutput {
    @Field(type => FreeTrial)
    freeTrial?:FreeTrial;
}