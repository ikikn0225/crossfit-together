import { Field, InputType, ObjectType, PickType, registerEnumType } from "@nestjs/graphql";
import { IsEnum } from "class-validator";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "../entities/user.entity";

@InputType()
export class CreateAccountInput extends PickType(User, ['name', 'email', 'password', 'role', 'myBox']) {
}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}