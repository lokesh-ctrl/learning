import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swaggerConfig";
import userRoutes from "./routes/userRoutes";
import conversationRoutes from "./routes/conversationRoutes";
import { createServer } from "http";
import { Server } from "ws";

createConnection()
  .then(async () => {
    const app = express();
    const server = createServer(app);
    const wss = new Server({ server });

    app.use(express.json());
    app.use(cors());

    // Swagger UI setup
    app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    app.use("/api/users", userRoutes);
    app.use("/api/conversations", conversationRoutes);

    wss.on("connection", (ws, req) => {
      // Handle WebSocket connections
      ws.on("message", (message) => {
        // Handle incoming WebSocket messages
        console.log(`Received message: ${message}`);
      });
    });

    server.listen(3000, () => {
      console.log("Server started on http://localhost:3000");
      console.log("API documentation available at http://localhost:3000/docs");
    });
  })
  .catch((error) => console.log(error));
