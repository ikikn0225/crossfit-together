import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Bor } from 'src/board-of-record/entities/board-of-record.entity';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { CoreEntity } from 'src/common/core.entity';
import { Notice } from 'src/notice/entities/notice.entity';
import { Reply } from 'src/reply/entities/reply.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, RelationId } from 'typeorm';


@InputType('CommentInputType', {isAbstract: true})
@ObjectType()
@Entity()
export class Comment extends CoreEntity {

    @Field(type => String)
    @Column()
    content:string;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.comments,
        { onDelete: 'CASCADE', nullable: true }
    )
    owner: User;

    @RelationId((comment: Comment) => comment.owner)
    @Column()
    ownerId: number;

    @Field(type => Notice)
    @ManyToOne(
        type => Notice,
        notice => notice.comments,
        { onDelete: 'CASCADE', nullable: true }
    )
    notice: Notice;

    @RelationId((comment: Comment) => comment.notice)
    @Column()
    noticeId: number;

    @Field(type => [Reply])
    @OneToMany(
        type => Reply,
        reply => reply.owner,
        {nullable:true}
    )
    replies: Reply[];

}