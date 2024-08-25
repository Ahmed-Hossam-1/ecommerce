import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { initDB } from './src/datastore';
import { initSocketIO } from './src/utils/reqRealTime';
import { userRouter } from './src/routes/user.route';
import { authRouter } from './src/routes/auth.route';
import { sellerReqRouter } from './src/routes/seller_req.route';
import { errHandler } from './src/middleware/errorMiddleware';
import { categoryRouter } from './src/routes/category.route';
import { productRouter } from './src/routes/product.route';
import path from 'path';

// Load environment variables
dotenv.config();

(async () => {
  await initDB();
  const PORT = process.env.PORT || 5000;
  const app = express();
  const server = http.createServer(app);

  // Initialize Socket.IO
  initSocketIO(server);

  // Middleware
  app.use('/upload', express.static(path.join(__dirname, 'upload')));
  app.use(cors());
  app.use(express.json());

  // Routes
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/seller_req', sellerReqRouter);
  app.use('/api/category', categoryRouter);
  app.use('/api/product', productRouter);

  // Error handling middleware
  app.use(errHandler);

  // Start the server
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})();
