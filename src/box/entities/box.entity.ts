import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { Bor } from "src/board-of-record/entities/board-of-record.entity";
import { CoreEntity } from "src/common/core.entity";
import { FreeTrial } from "src/free-trial/entities/ft.entity";
import { Hold } from "src/hold/entities/hold.entity";
import { LeaderBoardNamedWod } from "src/leader-board/entities/lb-named-wods.entity";
import { LeaderBoardOneRm } from "src/leader-board/entities/lb-one-rm.entity";
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

    @Field(type => String, { nullable: true })
    @Column({ nullable: true })
    @IsString()
    coverImg: string;

    @Field(type => String)
    @Column()
    @IsString()
    address: string;

    @Field(type => [User])
    @OneToMany(
        type => User,
        user => user.affiliatedBox,
    )
    users: User[];

    @Field(type => [Wod])
    @OneToMany(
        type => Wod,
        wod => wod.affiliatedBox,
    )
    wods: Wod[];

    @Field(type => [Hold])
    @OneToMany(
        type => Hold,
        hold => hold.affiliatedBox,
    )
    holds: Hold[];

    @Field(type => [FreeTrial])
    @OneToMany(
        type => FreeTrial,
        ft => ft.affiliatedBox
    )
    freeTrials: FreeTrial[];

    @Field(type => [LeaderBoardOneRm])
    @OneToMany(
        type => LeaderBoardOneRm,
        lbOneRms => lbOneRms.affiliatedBox,
    )
    lbOneRms: LeaderBoardOneRm[];

    @Field(type => [LeaderBoardNamedWod])
    @OneToMany(
        type => LeaderBoardNamedWod,
        lbNamedWods => lbNamedWods.affiliatedBox,
    )
    lbNamedWods: LeaderBoardOneRm[];
}