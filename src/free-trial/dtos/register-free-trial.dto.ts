import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { FreeTrial } from "../entities/ft.entity";

@InputType()
export class RegisterFreeTrialInput extends PickType(FreeTrial, ['freeTrialAt']) {
    @Field(type => Date)
    freeTrialAt: Date;
}

@ObjectType()
export class RegisterFreeTrialOutput extends CoreOutput {
    @Field(type => Number)
    freeTrialId?:number;    
}