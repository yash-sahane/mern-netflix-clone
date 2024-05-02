import express from 'express';
import { config } from "dotenv";
import userRouter from './routes/user.js';
import cors from 'cors';
import path from 'path'; // Import the 'path' module

export const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello');
});

config({
  path: './database/config.env'
});

app.use(cors());

app.use('/users', userRouter);

// Define route to serve Vite build output files
app.use(express.static(path.join(__dirname, 'dist')));

// Define route to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
