import { Router } from "express";
import { UserService } from "../services/userService";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
const userService = new UserService();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - first_name
 *               - last_name
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               first_name:
 *                 type: string
 *               last_name:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register", async (req, res) => {
  try {
    const token = await userService.register(
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.password
    );
    res.status(201).send({ access_token: token });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully logged in
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", async (req, res) => {
  try {
    const token = await userService.login(req.body.username, req.body.password);
    res.status(200).send({ access_token: token });
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get logged in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched logged in user
 *       400:
 *         description: Invalid credentials
 */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const user = await userService.getLoggedUser(req.user.id);

    res.status(200).send(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/users/all:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched logged in user
 *       400:
 *         description: Invalid credentials
 */
router.get("/all", async (req, res) => {
  try {
    // @ts-ignore
    const user = await userService.getAllUsers();

    res.status(200).send(user);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;
