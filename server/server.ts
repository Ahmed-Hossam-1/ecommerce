import { initDB } from './src/datastore';
import { userRouter } from './src/routes/user.route';
import { errHandler } from './src/middleware/errorMiddleware';
import { authRouter } from './src/routes/auth.route';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { sellerReqRouter } from './src/routes/seller_req.route';

dotenv.config();

(async () => {
  await initDB();
  const PORT = process.env.PORT;
  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/seller_req', sellerReqRouter);

  app.use(errHandler);

  app.listen(PORT, () => {
    console.log(`server is running on post ${PORT}`);
  });
})();
