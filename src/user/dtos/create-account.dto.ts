import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "../entities/user.entity";


@InputType()
export class CreateAccountInput extends PickType(User, ['name', 'email', 'password', 'role', 'affiliatedBox',]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}