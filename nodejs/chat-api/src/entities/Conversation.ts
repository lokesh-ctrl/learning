import {Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany, Column} from "typeorm";
import { User } from "./User";
import { Message } from "./Message";

@Entity()
export class Conversation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length: 30})
  active!: string;

  @ManyToMany(() => User)
  @JoinTable()
  participants!: User[];

  @OneToMany(() => Message, (message) => message.conversation)
  messages!: Message[];
}
