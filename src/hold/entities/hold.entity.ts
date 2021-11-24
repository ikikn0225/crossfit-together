import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";


@InputType('HoldInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class Hold extends CoreEntity {

    @Field(type => Date)
    @Column()
    holdAt: Date;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.holds,
        { onDelete: 'CASCADE', nullable: true }
    )
    owner: User;

    @RelationId((hold: Hold) => hold.owner)
    @Column()
    ownerId: number;
    
    @Field(type => AffiliatedBox, { nullable: false })
    @ManyToOne(
        type => AffiliatedBox,
        box => box.holds,
        { onDelete: 'CASCADE', nullable: false },
    )
    affiliatedBox: AffiliatedBox;

    @RelationId((hold: Hold) => hold.affiliatedBox)
    @Column()
    affiliatedBoxId: number;
}

@InputType('HoldEdgeInputType', {isAbstract: true})
@ObjectType()
export class HoldEdge {

    @Field(type => Number)
    cursor:number;

    @Field(type => Hold)
    node:Hold;
}

@InputType('HoldPageInfoInputType', {isAbstract: true})
@ObjectType()
export class HoldPageInfo {

    @Field(type => Number)
    endCursor:number;

    @Field(type => Boolean)
    hasNextPage:boolean;
}

@InputType('HoldListResponseInputType', {isAbstract: true})
@ObjectType()
export class HoldListResponse {

    @Field(type => [HoldEdge])
    edges:HoldEdge[];

    @Field(type => HoldPageInfo)
    pageInfo:HoldPageInfo;
}