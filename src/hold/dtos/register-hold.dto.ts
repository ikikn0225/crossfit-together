import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Hold } from "../entities/hold.entity";

@InputType()
export class RegisterHoldInput extends PickType(Hold, ['holdAt']) {
    @Field(type => Date)
    holdAt: Date;
}

@ObjectType()
export class RegisterHoldOutput extends CoreOutput {}