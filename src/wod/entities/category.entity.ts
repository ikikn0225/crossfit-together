import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { extend } from "joi";
import { CoreEntity } from "src/common/core.entity";
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wod } from "./wod.entity";

@InputType("CategoryInputType", {isAbstract: true})
@ObjectType()
@Entity()
export class Category extends CoreEntity {

    @Field(type => String)
    @Column({unique:true})
    @IsString()
    name: string;

    @Field(type => String)
    @Column({unique:true})
    slug: string;

    @Field(type => [Wod], { nullable: true })
    @OneToMany(type => Wod, wod => wod.category,)
    wods: Wod[];
}