import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "../../user/entities/user.entity";
import { AffiliatedBox } from "../entities/box.entity";

@ObjectType()
export class MyAffiliatedBoxOutput extends CoreOutput {
    @Field(type => AffiliatedBox)
    affiliatedBox?:AffiliatedBox;
}