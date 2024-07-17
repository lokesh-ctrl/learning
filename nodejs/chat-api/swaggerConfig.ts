import swaggerJSDoc from 'swagger-jsdoc';

const swaggerOptions = {
	swaggerDefinition: {
		openapi: '3.0.0',
		info: {
			title: 'Messaging API',
			version: '1.0.0',
			description: 'API documentation for the messaging application',
		},
		servers: [
			{
				url: 'http://localhost:3000',
				description: 'Local server',
			},
		],
	},
	apis: ['./src/routes/*.ts', './src/entities/*.ts'], // Files containing annotations as above
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export default swaggerSpec;
