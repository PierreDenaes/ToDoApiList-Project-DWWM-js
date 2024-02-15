import express, { json } from 'express';
import cors from 'cors';
import tasksRoutes from './routes/tasks.js';
import statusRoutes from './routes/status.js';
import archivedRoutes from './routes/archived.js';

const app = express();
app.use(json());
app.use(cors());

app.use('/tasks', tasksRoutes);
app.use('/status', statusRoutes);
app.use('/status', archivedRoutes);

export default app;
