import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";


@InputType()
export class DeleteOneRmInput{
    @Field(type => Int)
    oneRmId:number;
}

@ObjectType()
export class DeleteOneRmOutput extends CoreOutput {}