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

app.use(cors())

app.use('/users', userRouter);

// Define route to serve React application's static files
app.use(express.static(path.join(__dirname, 'client/build')));

// Define route to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});