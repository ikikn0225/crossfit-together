import { Field, InputType, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsEnum } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, RelationId } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';
import { AffiliatedBox } from 'src/box/entities/box.entity';
import { AffiliatedBoxList } from 'src/box/box.enums';

export enum UserRole {
  Crossfiter = 'Crossfiter',
  Coach = 'Coach'
};

registerEnumType(UserRole, {name: 'UserRole'});
registerEnumType(AffiliatedBoxList, {name: 'AffiliatedBoxList'});
//ORM?
//ORM(Object Relational Model)은 사물을 추상화시켜 이해하려는 OOP적 사고방식과 DataModel을 정형화하여 
//관리하려는 RDB 사이를 연결할 계층의 역할로 제시된 패러다임으로 RDB의 모델을 OOP에 Entity 형태로 투영시키는 방식을 사용한다.
@InputType("UserInputType", {isAbstract: true})
@ObjectType()
@Entity()
export class User extends CoreEntity {

  @Field(type => String)  // nest(gql) - schema type 지정
  @Column()               // typeorm
  name: string;

  @Field(type => String)
  @Column()
  @IsEmail()
  email: string;

  @Field(type => String)
  @Column({select: false})
  password: string;

  @Field(type => UserRole)
  @Column({type: 'enum', enum: UserRole})
  @IsEnum(UserRole)
  role: UserRole;

  @Field(type => AffiliatedBox)
  @ManyToOne(
    type => AffiliatedBox,
    affiliatedbox => affiliatedbox.users,
    { onDelete: 'SET NULL', nullable: true }
  )
  affiliatedBox?: AffiliatedBox;

  @RelationId((user: User) => user.affiliatedBox)
  affiliatedBoxId: number;

  @Field(type => Boolean)
  @Column({ default: false })
  verified:boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if(this.password) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(aPassword: string): Promise<boolean> {
    try {
      const ok = await bcrypt.compare(aPassword, this.password);
      return ok;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}