

import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { string } from "joi";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { NamedWodsList } from "../lb-named-wods.enum";

registerEnumType(NamedWodsList, {name: 'NamedWodsList'});

@InputType('LeaderBoardNamedWodsListInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class LeaderBoardNamedWod extends CoreEntity {

    @Field(type => NamedWodsList)
    @Column()
    namedWod:NamedWodsList;

    @Field(type => String)
    @Column()
    record: string;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.lbNamedWods,
        { onDelete: 'CASCADE'},
    )
    owner: User;

    @RelationId((lbNamedWods: LeaderBoardNamedWod) => lbNamedWods.owner)
    ownerId: number;

    @Field(type => AffiliatedBox)
    @ManyToOne(
        type => AffiliatedBox,
        affiliatedbox => affiliatedbox.lbNamedWods,
        { onDelete: 'SET NULL', nullable: true }
    )
    affiliatedBox?: AffiliatedBox;

    @RelationId((lbNamedWods: LeaderBoardNamedWod) => lbNamedWods.affiliatedBox)
    affiliatedBoxId: number;
}