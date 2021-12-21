import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "../entities/user.entity";

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
    @Field(type => String, {nullable: true})
    token?:string;

    @Field(type => String, {nullable: true})
    refreshToken?:string;
}