import { Field, InputType, ObjectType, PickType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";
import { AffiliatedBoxList } from "src/box/box.enums";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "../entities/user.entity";

@InputType()
export class CreateAccountInput extends PickType(User, ['name', 'email', 'password', 'coverImg', 'role']) {
    @Field(type => AffiliatedBoxList, {nullable: true})
    @IsEnum(AffiliatedBoxList)
    myBox?:AffiliatedBoxList;
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}