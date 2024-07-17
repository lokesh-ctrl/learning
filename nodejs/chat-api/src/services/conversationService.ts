import {getRepository} from "typeorm";
import {Conversation} from "../entities/Conversation";
import {User} from "../entities/User";
import {Message} from "../entities/Message";

export class ConversationService {
	async createConversation(participants: number[]) {
		const userRepository = getRepository(User);
		const users = await userRepository.findByIds(participants);
		const conversationRepository = getRepository(Conversation);
		const conversation = conversationRepository.create({participants: users});
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
}
