import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { ConversationService } from "../services/conversationService";

const router = Router();
const conversationService = new ConversationService();

/**
 * @swagger
 * /api/conversations:
 *   post:
 *     summary: Create a new conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - participants
 *               - active
 *             properties:
 *               participants:
 *                 type: array
 *                 items:
 *                   type: number
 *               active:
 *                 type: string
 *     responses:
 *       201:
 *         description: Conversation created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const conversation = await conversationService.createConversation(req.body.participants,req.body.active);
    res.status(201).send(conversation);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/conversations/{id}/messages:
 *   post:
 *     summary: Add a message to a conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Conversation ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *             properties:
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message added successfully
 *       400:
 *         description: Invalid input
 */
router.post("/:id/messages", authMiddleware, async (req, res) => {
  try {
    const message = await conversationService.addMessage(
      parseInt(req.params.id),
      // @ts-ignore
      req.user.id,
      req.body.content
    );
    res.status(201).send(message);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/conversations/{id}/messages:
 *   get:
 *     summary: Fetch messages in a conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Successfully fetched messages
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   content:
 *                     type: string
 *                   sender:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *       400:
 *         description: Invalid input
 */
router.get("/:id/messages", authMiddleware, async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const messages = await conversationService.getMessages(conversationId);
    res.status(200).send(messages);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/conversations/mine:
 *   get:
 *     summary: Get all conversations the authenticated user is part of
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched user conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   participants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         username:
 *                           type: string
 *                   messages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         content:
 *                           type: string
 *                         sender:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: integer
 *                             username:
 *                               type: string
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *       400:
 *         description: Invalid input
 */
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.user.id;
    const conversations = await conversationService.getUserConversations(userId);
    res.status(200).send(conversations);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/conversations:
 *   get:
 *     summary: Get all conversations with participants and last message
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched all conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   participants:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         username:
 *                           type: string
 *                   lastMessage:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       sender:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           username:
 *                             type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid input
 */
router.get("/", async (req, res) => {
  try {
    const conversations = await conversationService.getAllConversations();
    res.status(200).send(conversations);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/conversations/{id}:
 *   delete:
 *     summary: Delete a conversation
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Conversation deleted successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Conversation not found or user not authorized
 */
router.delete("/:id", async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    await conversationService.deleteConversation(conversationId);
    res.status(200).send({message: "Conversation deleted successfully"});
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

/**
 * @swagger
 * /api/conversations/{id}:
 *   get:
 *     summary: Get a conversation by ID
 *     tags: [Conversations]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Conversation ID
 *     responses:
 *       200:
 *         description: Successfully fetched the conversation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 participants:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       username:
 *                         type: string
 *                       full_name:
 *                         type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       content:
 *                         type: string
 *                       sender:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           username:
 *                             type: string
 *                           full_name:
 *                             type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Conversation not found
 */
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const conversationId = parseInt(req.params.id);
    const conversation = await conversationService.getConversationById(conversationId);
    res.status(200).send(conversation);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

export default router;
