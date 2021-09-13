import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/common.dto";
import { Column } from "typeorm";
import { Category } from "../entities/category.entity";
import { Wod } from "../entities/wod.entity";


@InputType()
export class CategoryInput {
    @Field(type => String)
    slug:string;
}

@ObjectType()
export class CategoryOutput extends CoreOutput {
    @Field(type => [Wod], {nullable: true})
    wods?: Wod[];

    @Field(type => Category)
    category?: Category;
}