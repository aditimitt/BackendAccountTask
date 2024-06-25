import 'reflect-metadata';
import express from 'express';
import { AppDataSource } from './ormconfig';
import dotenv from 'dotenv';
import routes from './routes';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');

  // Middleware to parse JSON
  app.use(express.json());

  // Register routes
  app.use(routes);

  // Start server
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((error) => {
  console.error('Error during Data Source initialization:', error);
});
