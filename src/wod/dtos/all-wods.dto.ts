import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Wod } from "../entities/wod.entity";


@InputType()
export class AllWodsInput {
    @Field(type => String, { nullable: true })
    slug?:string;
}

@ObjectType()
export class AllWodsOutput extends CoreOutput {
    @Field(type => [Wod], { nullable:true })
    wods?:Wod[];
}