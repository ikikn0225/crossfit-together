import { Field, ObjectType } from "@nestjs/graphql";
import { type } from "os";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Wod } from "../entities/wod.entity";


@ObjectType()
export class AllWodsOutput extends CoreOutput {
    @Field(type => [Wod], { nullable:true })
    wods?:Wod[];
}