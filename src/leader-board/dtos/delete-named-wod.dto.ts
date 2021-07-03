import { Field, InputType, Int, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";


@InputType()
export class DeleteNamedWodInput{
    @Field(type => Int)
    namedWodId:number;
}

@ObjectType()
export class DeleteNamedWodOutput extends CoreOutput {}