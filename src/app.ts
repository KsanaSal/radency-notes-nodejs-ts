import express, { NextFunction, Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';
import notesRouter from './routes/notes.js';
import { setupSwagger } from './swagger.js';

const app = express();

setupSwagger(app);

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/notes', notesRouter);

interface IExtendedError extends Error {
  status?: number;
}

app.use((err: IExtendedError, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message: message });
});

export default app;
