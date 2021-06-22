import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/core.entity";
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { v4 as uuidv4 } from 'uuid';

@InputType({ isAbstract: true})
@ObjectType()
@Entity()
export class Verification extends CoreEntity {

    @Field(type => String)
    @Column()
    code:string;

    @OneToOne(type => User, { onDelete:'CASCADE' })
    @JoinColumn()
    user:User;

    @BeforeInsert()
    createCode(): void {
        this.code = uuidv4();
    }
}