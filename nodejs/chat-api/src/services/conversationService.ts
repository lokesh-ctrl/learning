import {getRepository} from "typeorm";
import {Conversation} from "../entities/Conversation";
import {User} from "../entities/User";
import {Message} from "../entities/Message";
import {plainToClass} from "class-transformer";
import {getFormattedUser} from "../utils";


export class ConversationService {
	async getConversationById(conversationId: number): Promise<Conversation> {
		const conversationRepository = getRepository(Conversation);
		const conversation = await conversationRepository
			.createQueryBuilder("conversation")
			.leftJoinAndSelect("conversation.participants", "participant")
			.leftJoinAndSelect("conversation.messages", "message")
			.leftJoinAndSelect("message.sender", "sender")
			.leftJoinAndSelect("message.receiver", "receiver")
			.where("conversation.id = :conversationId", {conversationId})
			.getOne();

		if (!conversation) {
			throw new Error("Conversation not found");
		}

		return {...conversation, participants: conversation.participants.map((user) => getFormattedUser(user))};
	}
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
			relations: ["messages", "participants"]
		});
		if (!conversation) throw new Error("Conversation not found");

		const userRepository = getRepository(User);
		const sender = await userRepository.findOne({where: {id: senderId}});
		if (!sender) throw new Error("Sender not found");

		const receiver = conversation.participants.filter((user) => user.id != senderId)[0]

		if (!receiver) throw new Error("Receiver not found");

		const messageRepository = getRepository(Message);
		const message = messageRepository.create({
			content,
			sender,
			conversation,
			receiver,
			sender_id: senderId,
			receiver_id: receiver.id,
			conversation_id: conversationId
		});
		await messageRepository.save(message);

		conversation.messages.push(message);
		await conversationRepository.save(conversation);

		return message;
	}

	async getMessages(conversationId: number): Promise<Message[]> {
		const conversationRepository = getRepository(Conversation);
		const conversation = await conversationRepository.findOne({
			where: {id: conversationId},
			relations: ["messages", "messages.sender", "messages.receiver"]
		});
		if (!conversation) {
			throw new Error("Conversation not found");
		}

		return conversation.messages.map(message => plainToClass(Message, message));
	}

	async getUserConversations(userId: number): Promise<{
		conversations: {
			lastMessage: Message;
			active: string;
			messages: undefined;
			id: number;
			participants: User[]
		}[];
		user: User
	}> {
		const userRepository = getRepository(User);
		// @ts-ignore
		const user = await userRepository.findOne({where: {id: userId}});
		const conversationRepository = getRepository(Conversation);
		let conversations = await conversationRepository
			.createQueryBuilder("conversation")
			.leftJoinAndSelect("conversation.participants", "participant")
			.leftJoinAndSelect("conversation.messages", "message")
			.leftJoinAndSelect("message.sender", "sender")
			.orderBy("message.createdAt", "DESC")
			.getMany();

		// Include only the last message for each conversation
		const conversationsWithLastMessage = conversations.map(conversation => {
			const lastMessage = conversation.messages[0]; // messages are already ordered by createdAt DESC
			return {
				...conversation,
				lastMessage,
				participants: conversation.participants.map((participant) => getFormattedUser(participant)),
				messages: undefined // remove the full messages array
			};
		});
		return {conversations: conversationsWithLastMessage, user: getFormattedUser(user)}
	}

	async getAllConversations(): Promise<{
		lastMessage: Message;
		active: string;
		messages: undefined;
		id: number;
		participants: User[]
	}[]> {
		const conversationRepository = getRepository(Conversation);
		let conversations = await conversationRepository
			.createQueryBuilder("conversation")
			.leftJoinAndSelect("conversation.participants", "participant")
			.leftJoinAndSelect("conversation.messages", "message")
			.leftJoinAndSelect("message.sender", "sender")
			.orderBy("message.createdAt", "DESC")
			.getMany();

		// Include only the last message for each conversation
		const conversationsWithLastMessage = conversations.map(conversation => {
			const lastMessage = conversation.messages[0]; // messages are already ordered by createdAt DESC
			return {
				...conversation,
				participants: conversation.participants.map((participant) => getFormattedUser(participant)),
				lastMessage,
				messages: undefined // remove the full messages array
			};
		});

		return conversationsWithLastMessage
	}

	async deleteConversation(conversationId: number): Promise<void> {
		const conversationRepository = getRepository(Conversation);
		const conversation = await conversationRepository
			.createQueryBuilder("conversation")
			.leftJoinAndSelect("conversation.participants", "participant")
			.where("conversation.id = :conversationId", {conversationId})
			.getOne();

		if (!conversation) {
			throw new Error("Conversation not found");
		}

		await conversationRepository.remove(conversation);
	}
}
