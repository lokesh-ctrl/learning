import {getRepository} from "typeorm";
import {Conversation} from "../entities/Conversation";
import {User} from "../entities/User";
import {Message} from "../entities/Message";

export class ConversationService {
	async createConversation(participants: number[], active: string) {
		const conversationRepository = getRepository(Conversation);
		const userRepository = getRepository(User);
		const users = await userRepository.findByIds(participants);
		const conversation = conversationRepository.create({participants: users, active});
		await conversationRepository.save(conversation);
		return conversation;
	}

	async addMessage(conversationId: number, senderId: number, content: string) {
		const conversationRepository = getRepository(Conversation);
		const conversation = await conversationRepository.findOne({
			where: {id: conversationId},
			relations: ["messages"]
		});
		if (!conversation) throw new Error("Conversation not found");

		const userRepository = getRepository(User);
		const sender = await userRepository.findOne({where: {id: senderId}});
		if (!sender) throw new Error("Sender not found");

		const messageRepository = getRepository(Message);
		const message = messageRepository.create({content, sender, conversation});
		await messageRepository.save(message);

		conversation.messages.push(message);
		await conversationRepository.save(conversation);

		return message;
	}

	async getMessages(conversationId: number): Promise<Message[]> {
		const conversationRepository = getRepository(Conversation);
		const conversation = await conversationRepository.findOne({
			where: {id: conversationId},
			relations: ["messages", "messages.sender"]
		});
		if (!conversation) {
			throw new Error("Conversation not found");
		}

		return conversation.messages;
	}
}
