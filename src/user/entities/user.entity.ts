import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  @Field(type => Number)
  id: number;

  @Field(type => String)
  @Column()
  email: string;

  @Field(type => String)
  @Column()
  name: string;

  @Field(type => String)
  @Column()
  password: string;

  @Field(type => String)
  @Column()
  role: string;

  @Field(type => String)
  @Column()
  affiliated: string;
}