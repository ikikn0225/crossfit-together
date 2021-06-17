import { Field, InputType, ObjectType, registerEnumType } from '@nestjs/graphql';
import { IsEmail, IsEnum } from 'class-validator';
import { CoreEntity } from 'src/common/core.entity';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

export enum UserRole {
  Crossfiter = 'Client',
  Coach = 'Coach'
};

registerEnumType(UserRole, {name: 'UserRole'});

@InputType({ isAbstract:true })
@ObjectType()
@Entity()
export class User extends CoreEntity {

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => String)
  @Column()
  @IsEmail()
  email: string;

  @Field(type => String)
  @Column()
  password: string;

  @Field(type => UserRole)
  @Column({type: 'enum', enum: UserRole})
  @IsEnum(UserRole)
  role: UserRole;

  @Field(type => String)
  @Column()
  affiliated: string;

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      throw new InternalServerErrorException();
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