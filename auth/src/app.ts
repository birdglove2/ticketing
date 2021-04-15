import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
  currentUserRouter,
  signupRouter,
  signinRouter,
  signoutRouter,
} from './routes/index-routes';

import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);

app.all('*', async () => {
  throw new NotFoundError('404 Page Not Found');
});

app.use(errorHandler);

export { app };
