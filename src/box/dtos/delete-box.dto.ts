import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";


@ObjectType()
export class DeleteAffiliatedBoxOutput extends CoreOutput {
}