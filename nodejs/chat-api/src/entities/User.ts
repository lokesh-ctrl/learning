import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Conversation } from "./Conversation";
import { Message } from "./Message";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Conversation, (conversation) => conversation.participants)
  conversations: Conversation[];

  @OneToMany(() => Message, (message) => message.sender)
  messages: Message[];
}
