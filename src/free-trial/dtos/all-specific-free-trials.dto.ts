import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { FreeTrial } from "../entities/ft.entity";

@InputType()
export class AllSpecificFreeTrialsInput {
    @Field(type => Date, {nullable:true})
    freeTrialAt?:Date;
}

@ObjectType()
export class AllSpecificFreeTrialsOutput extends CoreOutput {
    @Field(type => [FreeTrial], {nullable:true})
    freeTrials?:FreeTrial[];
}