import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Bor } from 'src/board-of-record/entities/board-of-record.entity';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { CoreEntity } from 'src/common/core.entity';
import { CoreOutput } from 'src/common/dtos/common.dto';
import { Like } from 'src/like/entities/like.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import { Category } from './category.entity';

@InputType('WodInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Wod extends CoreEntity {

    @Field(type => String)
    @Column()
    title:string;

    @Field(type => Date, { nullable: true })
    @Column({ nullable: true })
    titleDate:Date;

    @Field(type => String)
    @Column()
    content:string;

    @Field(type => AffiliatedBox, { nullable: false })
    @ManyToOne(
        type => AffiliatedBox,
        box => box.wods,
        { onDelete: 'CASCADE', nullable: false },
    )
    affiliatedBox: AffiliatedBox;

    @RelationId((wod: Wod) => wod.affiliatedBox)
    affiliatedBoxId: number;

    @Field(type => Category)
    @ManyToOne(
        type => Category,
        category => category.wods
    )
    category: Category;

    @Field(type => [Bor])
    @OneToMany(
        type => Bor,
        bor => bor.wod,
    )
    bors: Bor[];

    @Field(type => [Like])
    @OneToMany(
        type => Like,
        like => like.wod,
    )
    likes: Like[];

    // @Field(type => Comment)
    // @OneToMany(
    //     type => Comment,
    // )
    // comment: Comment;
}

@InputType('EdgeInputType', {isAbstract: true})
@ObjectType()
export class Edge {

    @Field(type => Number)
    cursor:number;

    @Field(type => Wod)
    node:Wod;
}

@InputType('PageInfoInputType', {isAbstract: true})
@ObjectType()
export class PageInfo {

    @Field(type => Number)
    endCursor:number;

    @Field(type => Boolean)
    hasNextPage:boolean;
}

@InputType('WodListResponseInputType', {isAbstract: true})
@ObjectType()
export class WodListResponse {

    @Field(type => [Edge])
    edges:Edge[];

    @Field(type => PageInfo)
    pageInfo:PageInfo;
}