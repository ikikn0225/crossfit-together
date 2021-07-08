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
    @Column()
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

