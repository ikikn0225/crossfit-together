import { InputType, ObjectType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { FreeTrial } from "../entities/ft.entity";

@InputType()
export class DeleteFreeTrialInput extends PickType(FreeTrial, ['id']) {}

@ObjectType()
export class DeleteFreeTrialOutput extends CoreOutput {}