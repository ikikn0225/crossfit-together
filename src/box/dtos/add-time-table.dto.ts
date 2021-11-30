import { Field, InputType, Int, ObjectType, OmitType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { User } from "src/user/entities/user.entity";
import { AffiliatedBox } from "../entities/box.entity";


@InputType()
export class AddTimeTableInput extends PickType(AffiliatedBox, ['timeTableImg']) {
}

@ObjectType()
export class AddTimeTableOutput extends CoreOutput {}