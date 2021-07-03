import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, RelationId } from "typeorm";


@InputType('HoldInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class Hold extends CoreEntity {

    @Field(type => String)
    @Column()
    holdAt: string;

    @Field(type => User)
    @ManyToOne(
        type => User,
        user => user.holds,
        { onDelete: 'SET NULL', nullable: true }
    )
    owner: User;

    @RelationId((hold: Hold) => hold.owner)
    ownerId: number;
    
    @Field(type => AffiliatedBox, { nullable: false })
    @ManyToOne(
        type => AffiliatedBox,
        box => box.holds,
        { onDelete: 'CASCADE', nullable: false },
    )
    affiliatedBox: AffiliatedBox;

    @RelationId((hold: Hold) => hold.affiliatedBox)
    affiliatedBoxId: number;
}