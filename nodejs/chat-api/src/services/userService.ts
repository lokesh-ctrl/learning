import {getRepository} from "typeorm";
import {User} from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class UserService {
	async register(first_name: string, last_name: string, email: string, password: string): Promise<User> {
		const userRepository = getRepository(User);
		const hashedPassword = await bcrypt.hash(password, 10);
		const user = userRepository.create({first_name, last_name, email, password: hashedPassword});
		await userRepository.save(user);
		return user;
	}

	async login(email: string, password: string) {
		const userRepository = getRepository(User);
		const user = await userRepository.findOne({where: {email}});
		if (!user || !(await bcrypt.compare(password, user.password))) {
			throw new Error("Invalid credentials");
		}
		const token = jwt.sign({id: user.id}, "your-jwt-secret", {
			expiresIn: "24h",
		});
		return token;
	}
}
