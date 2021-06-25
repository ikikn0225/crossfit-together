import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, RelationId } from "typeorm";
import { AffiliatedBoxList } from "../box.enums";


@InputType('AffiliatedBoxInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class AffiliatedBox extends CoreEntity {
    @Field(type => AffiliatedBoxList)
    @Column()
    name: AffiliatedBoxList;

    @Field(type => String)
    @Column()
    @IsString()
    coverImg: string;

    @Field(type => String)
    @Column()
    @IsString()
    address: string;

    @Field(type => [User])
    @OneToMany(
        type => User,
        user => user.affiliatedBox
    )
    users: User[];

    @Field(type => [Wod])
    @OneToMany(
        type => Wod,
        wod => wod.box,
    )
    wods: Wod[];
}