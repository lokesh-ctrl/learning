import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import { ConversationService } from "../services/conversationService";

const router = Router();
const conversationService = new ConversationService();

router.post("/", authMiddleware, async (req, res) => {
  try {
    const conversation = await conversationService.createConversation(req.body.participants);
    res.status(201).send(conversation);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
});

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

export default router;
