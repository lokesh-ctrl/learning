import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Conversation } from "./Conversation";

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  sender_id!: number;

  @Column()
  receiver_id!: number;

  @Column()
  conversation_id!: number;

  @ManyToOne(() => User, (user) => user.messages)
  sender!: User;

  @ManyToOne(() => User, (user) => user.messages)
  receiver!: User;

  @ManyToOne(() => Conversation, (conversation) => conversation.messages)
  conversation!: Conversation;


  @CreateDateColumn({ type: 'timestamp' })
  createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt!: Date;
}
