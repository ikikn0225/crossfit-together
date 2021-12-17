import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString } from "class-validator";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, RelationId } from "typeorm";

@InputType('NoticeInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class Notice extends CoreEntity {

    @Field(type => String)
    @Column()
    @IsString()
    title: string;

    @Field(type => String, {nullable:true})
    @Column({ nullable: true })
    @IsString()
    coverImg?: string;

    @Field(type => String)
    @Column()
    @IsString()
    contents: string;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.notices,
        { onDelete: 'CASCADE', nullable: true }
    )
    owner: User;

    @RelationId((notice: Notice) => notice.owner)
    @Column()
    ownerId: number;
    
    @Field(type => AffiliatedBox, { nullable: false })
    @ManyToOne(
        type => AffiliatedBox,
        box => box.notices,
        { onDelete: 'CASCADE', nullable: false },
    )
    affiliatedBox: AffiliatedBox;

    @RelationId((notice: Notice) => notice.affiliatedBox)
    @Column()
    affiliatedBoxId: number;

    @Field(type => [Comment])
    @OneToMany(
        type => Comment,
        comment => comment.notice,
        {nullable:true}
    )
    comments: Comment[];
}

@InputType('NoticeEdgeInputType', {isAbstract: true})
@ObjectType()
export class NoticeEdge {

    @Field(type => Number)
    cursor:number;

    @Field(type => Notice)
    node:Notice;
}

@InputType('NoticePageInfoInputType', {isAbstract: true})
@ObjectType()
export class NoticePageInfo {

    @Field(type => Number)
    endCursor:number;

    @Field(type => Boolean)
    hasNextPage:boolean;
}

@InputType('NoticeListResponseInputType', {isAbstract: true})
@ObjectType()
export class NoticeListResponse {

    @Field(type => [NoticeEdge])
    edges:NoticeEdge[];

    @Field(type => NoticePageInfo)
    pageInfo:NoticePageInfo;
}