import express from 'express';
import { DB_URL, PORT } from './config/env.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import connectToDatabase from './database/mongodb.js';
import nodeCron from 'node-cron';
import runExpireJob from './cron/expireSubscriptions.js';
import errorMiddleware from './middlewares/error.middleware.js';

const app = express();

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscription', subscriptionRouter);

app.use(errorMiddleware);

nodeCron.schedule('0 0 * * *', async () => {
  console.log('Running the daily expire job.....');
  try {
    await runExpireJob();
    console.log('Expire job Done');
  } catch (error) {
    console.error('Expire job failed:', error);
  }
});

(async () => {
  try {
    await connectToDatabase(DB_URL);

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
    process.exit(1);
  }
})();

process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });
});

export default app;
