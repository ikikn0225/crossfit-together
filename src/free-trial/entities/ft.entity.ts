import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";


@InputType('FreeTrialInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class FreeTrial extends CoreEntity {

    @Field(type => Date)
    @Column()
    freeTrialAt: Date;

    // @Field(type => String)
    // @Column()
    // workoutTime:string;

    @Field(type => User)
    @OneToOne(
        type => User,
        user => user.freeTrial,
        { onDelete: 'CASCADE', nullable: true }
    )
    @JoinColumn()
    owner: User;
    
    @Field(type => AffiliatedBox, { nullable: false })
    @ManyToOne(
        type => AffiliatedBox,
        box => box.freeTrials,
        { onDelete: 'CASCADE', nullable: false },
    )
    affiliatedBox: AffiliatedBox;

    @RelationId((ft: FreeTrial) => ft.affiliatedBox)
    @Column()
    affiliatedBoxId: number;
}

@InputType('FreeTrialEdgeInputType', {isAbstract: true})
@ObjectType()
export class FreeTrialEdge {

    @Field(type => Number)
    cursor:number;

    @Field(type => FreeTrial)
    node:FreeTrial;
}

@InputType('FreeTrialPageInfoInputType', {isAbstract: true})
@ObjectType()
export class FreeTrialPageInfo {

    @Field(type => Number)
    endCursor:number;

    @Field(type => Boolean)
    hasNextPage:boolean;
}

@InputType('FreeTrialListResponseInputType', {isAbstract: true})
@ObjectType()
export class FreeTrialListResponse {

    @Field(type => [FreeTrialEdge])
    edges:FreeTrialEdge[];

    @Field(type => FreeTrialPageInfo)
    pageInfo:FreeTrialPageInfo;
}