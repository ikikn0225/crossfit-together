import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { FreeTrial } from "../entities/ft.entity";

@InputType()
export class CreateFreeTrialInput extends PickType(FreeTrial, ['freeTrialAt', 'workoutTime']) {
    @Field(type => Date)
    freeTrialAt: Date;

    @Field(type => String)
    workoutTime:string;
}

@ObjectType()
export class CreateFreeTrialOutput extends CoreOutput {}