import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Hold } from "../entities/hold.entity";


@ObjectType()
export class MyHoldsOutput extends CoreOutput {
    @Field(type => [Hold])
    holds?:Hold[];
}