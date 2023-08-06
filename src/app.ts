import express, { Request, Response } from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err: any, req: Request, res: Response) => {
  const { status = 500, message = 'Server error' } = err;
  res.status(status).json({ message: message });
});

export default app;
