import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/core.entity';
import { User } from 'src/user/entities/user.entity';
import { Wod } from 'src/wod/entities/wod.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';


@InputType('LikeInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Like extends CoreEntity {

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.likes,
        { onDelete: 'CASCADE', nullable: true }
    )
    owner: User;

    @RelationId((like: Like) => like.owner)
    @Column()
    ownerId: number;

    @Field(type => Wod)
    @ManyToOne(
        type => Wod,
        box => box.likes,
        { onDelete: 'CASCADE'},
    )
    wod: Wod;

    @RelationId((like: Like) => like.wod)
    wodId: number;
}