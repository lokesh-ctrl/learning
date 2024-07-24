import { getRepository } from "typeorm";
import { User } from "../entities/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { getFormattedUser } from "../utils";

export class UserService {
  async register(
    first_name: string,
    last_name: string,
    email: string,
    password: string
  ): Promise<string> {
    const userRepository = getRepository(User);
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = userRepository.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });
    await userRepository.save(user);
    const token = jwt.sign({ id: user.id }, "your-jwt-secret", {
      expiresIn: "24h",
    });
    return token;
  }

  async login(email: string, password: string) {
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }
    const token = jwt.sign({ id: user.id }, "your-jwt-secret", {
      expiresIn: "24h",
    });
    return token;
  }

  async getLoggedUser(userId: string) {
    const userRepository = getRepository(User);
    // @ts-ignore
    const user = await userRepository.findOne({ where: { id: userId } });
    return getFormattedUser(user);
  }

  async getAllUsers() {
    const userRepository = getRepository(User);
    // @ts-ignore
    const users = await userRepository.find();
    return users.map((u) => getFormattedUser(u));
  }
}
