import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Bor } from 'src/board-of-record/entities/board-of-record.entity';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { CoreEntity } from 'src/common/core.entity';
import { Like } from 'src/like/entities/like.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';


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