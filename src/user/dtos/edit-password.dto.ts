import { Field, InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "../entities/user.entity";


@InputType()
export class EditPasswordInput extends PartialType(PickType(User, ['password'])) {
    @Field(type => String)
    currentPw: string;

    @Field(type => String)
    changePw: string;
}



@ObjectType()
export class EditPasswordOutput extends CoreOutput {}