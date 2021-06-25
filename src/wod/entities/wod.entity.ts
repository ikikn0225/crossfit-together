import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { CoreEntity } from 'src/common/core.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';


@InputType('WodInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Wod extends CoreEntity {

    @Field(type => String)
    @Column()
    title:string;

    @Field(type => String)
    @Column()
    content:string;

    @Field(type => AffiliatedBox, { nullable: false })
    @ManyToOne(
        type => AffiliatedBox,
        box => box.wods,
        { onDelete: 'CASCADE', nullable: false },
    )
    box: AffiliatedBox;

    @RelationId((wod: Wod) => wod.box)
    boxId: number;

    // @Field(type => Comment)
    // @OneToMany(
    //     type => Comment,
    // )
    // comment: Comment;
}