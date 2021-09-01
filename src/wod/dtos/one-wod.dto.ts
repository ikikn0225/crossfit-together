import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Wod } from "../entities/wod.entity";

@InputType()
export class OneWodInput {
    @Field(type => Int)
    wodId:number;
}

@ObjectType()
export class OneWodOutput extends CoreOutput {
    @Field(type => Wod, { nullable:true })
    wod?: Wod;
}