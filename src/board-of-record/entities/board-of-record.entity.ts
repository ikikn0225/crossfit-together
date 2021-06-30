import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Wod } from "src/wod/entities/wod.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";


@InputType('BorInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class Bor extends CoreEntity {

    @Field(type => String)
    @Column()
    content:string;

    @Field(type => Wod)
    @ManyToOne(
        type => Wod,
        box => box.bors,
        { onDelete: 'CASCADE'},
    )
    wod: Wod;

    @RelationId((bor: Bor) => bor.wod)
    wodId: number;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.bors,
        { onDelete: 'CASCADE'},
    )
    owner: User;

    @RelationId((bor: Bor) => bor.owner)
    ownerId: number;
}