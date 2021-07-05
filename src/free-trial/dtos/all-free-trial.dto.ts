import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { FreeTrial } from "../entities/ft.entity";

@ObjectType()
export class AllFreeTrialOutput extends CoreOutput {
    @Field(type => [FreeTrial], {nullable:true})
    freeTrials?:FreeTrial[];
}