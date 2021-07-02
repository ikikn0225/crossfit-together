import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Hold } from "../entities/hold.entity";

@InputType()
export class RegisterHoldInput extends PickType(Hold, ['holdAt']) {
    @Field(type => String)
    holdAt: string;
}

@ObjectType()
export class RegisterHoldOutput extends CoreOutput {}