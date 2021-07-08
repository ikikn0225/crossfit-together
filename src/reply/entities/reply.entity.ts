import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Comment } from 'src/comment/entities/comment.entity';
import { CoreEntity } from 'src/common/core.entity';
import { Notice } from 'src/notice/entities/notice.entity';
import { User } from 'src/user/entities/user.entity';
import { Wod } from 'src/wod/entities/wod.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';


@InputType('ReplyInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Reply extends CoreEntity {

    @Field(type => String)
    @Column()
    content:string;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.replies,
        { onDelete: 'CASCADE', nullable: true }
    )
    owner: User;

    @RelationId((reply: Reply) => reply.owner)
    @Column()
    ownerId: number;

    @Field(type => Comment)
    @ManyToOne(
        type => Comment,
        comment => comment.replies,
        { onDelete: 'CASCADE', nullable: true }
    )
    comment: Comment;

    @RelationId((reply: Reply) => reply.comment)
    @Column()
    commentId: number;

}