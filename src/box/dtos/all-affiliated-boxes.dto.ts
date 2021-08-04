import { Field, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { AffiliatedBox } from "../entities/box.entity";

@ObjectType()
export class AllAffiliatedBoxesOutput extends CoreOutput {
    @Field(type => [AffiliatedBox], {nullable:true})
    allAffiliatedBoxes?: AffiliatedBox[];
}