import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "../../user/entities/user.entity";
import { AffiliatedBox } from "../entities/box.entity";


// @InputType()
// export class MyAffiliatedBoxUsersInput extends PartialType(AffiliatedBox) {}

@ObjectType()
export class MyAffiliatedBoxUsersOutput extends CoreOutput {
    @Field(type => [User])
    users?:User[];
}