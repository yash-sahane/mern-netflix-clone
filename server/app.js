import express from 'express';
import { config } from "dotenv";
import userRouter from './routes/user.js';
import cors from 'cors';

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
})

config({
  path: './database/config.env'
});

app.use(cors({
  origin: [process.env.FRONTEND_URI],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use('/users', userRouter);