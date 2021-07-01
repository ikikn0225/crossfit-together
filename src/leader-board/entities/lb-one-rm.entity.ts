import { Field, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";
import { OneRmList } from "../lb-one-rm.enum";

registerEnumType(OneRmList, {name: 'OneRmList'});

@InputType('LeaderBoardOneRmInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class LeaderBoardOneRm extends CoreEntity {

    @Field(type => OneRmList)
    @Column()
    oneRm:OneRmList;

    @Field(type => Number)
    @Column()
    record: number;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.lbOneRms,
        { onDelete: 'CASCADE'},
    )
    owner: User;

    @RelationId((lbOneRms: LeaderBoardOneRm) => lbOneRms.owner)
    ownerId: number;

    @Field(type => AffiliatedBox)
    @ManyToOne(
        type => AffiliatedBox,
        affiliatedbox => affiliatedbox.lbOneRms,
        { onDelete: 'SET NULL'}
    )
    affiliatedBox: AffiliatedBox;

    @RelationId((lbOneRms: LeaderBoardOneRm) => lbOneRms.affiliatedBox)
    affiliatedBoxId: number;
}