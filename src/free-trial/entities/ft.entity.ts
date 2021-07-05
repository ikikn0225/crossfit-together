import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { AffiliatedBox } from "src/box/entities/box.entity";
import { CoreEntity } from "src/common/core.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, RelationId } from "typeorm";


@InputType('HoldInputType', {isAbstract:true})
@ObjectType()
@Entity()
export class FreeTrial extends CoreEntity {

    @Field(type => Date)
    @Column()
    freeTrialAt: Date;

    @Field(type => String)
    @Column()
    workoutTime:string;

    @Field(type => User)
    @OneToOne(
        type => User,
        user => user.freeTrial,
        { onDelete: 'CASCADE', nullable: true }
    )
    @JoinColumn()
    owner: User;
    
    @Field(type => AffiliatedBox, { nullable: false })
    @ManyToOne(
        type => AffiliatedBox,
        box => box.freeTrials,
        { onDelete: 'CASCADE', nullable: false },
    )
    affiliatedBox: AffiliatedBox;

    @RelationId((ft: FreeTrial) => ft.affiliatedBox)
    @Column()
    affiliatedBoxId: number;
}