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

export default router;
