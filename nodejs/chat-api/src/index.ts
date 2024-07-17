import "reflect-metadata";
import {createConnection} from "typeorm";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "../swaggerConfig";
import userRoutes from "./routes/userRoutes";
import conversationRoutes from "./routes/conversationRoutes";

createConnection()
	.then(async () => {
		const app = express();
		app.use(express.json());

		// Swagger UI setup
		app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

		app.use("/api/users", userRoutes);
		app.use("/api/conversations", conversationRoutes);

		app.listen(3000, () => {
			console.log("Server started on http://localhost:3000");
			console.log("API documentation available at http://localhost:3000/docs");
		});
	})
	.catch((error) => console.log(error));
