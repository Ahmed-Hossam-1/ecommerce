import express from 'express';
import cors from 'cors';
import { initDB } from './src/datastore';
import { userRouter } from './src/routes/user.route';
// import dotenv from 'dotenv';

(async () => {
  await initDB();
  const app = express();

  app.use(cors());
  app.use('/', userRouter);
  app.get('/', (__, res) => {
    res.send('Hello World');
  });

  app.listen(5000, () => {
    console.log('Server is running on port 5000');
  });
})();
