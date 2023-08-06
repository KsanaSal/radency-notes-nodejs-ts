import express from 'express';
import logger from 'morgan';
import cors from 'cors';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());

app.get('/', (req, res) => {
  res.send('The sedulous hyena ate the antelope!');
});

export default app;
