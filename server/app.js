import express from 'express';
import { config } from "dotenv";
import userRouter from './routes/user.js';
import cors from 'cors';
import path from 'path';

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

// Get the directory name from the current file's URL
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Define route to serve Vite build output files
app.use(express.static(path.join(__dirname, 'dist')));

// Define route to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
