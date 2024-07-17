import {Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable} from "typeorm";
import { Conversation } from "./Conversation";
import { Message } from "./Message";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Conversation, (conversation) => conversation.participants)
  @JoinTable()
  conversations!: Conversation[];

  @OneToMany(() => Message, (message) => message.sender)
  messages!: Message[];

  get fullName() {
    return this.first_name + ' ' + this.last_name;
  }
}
