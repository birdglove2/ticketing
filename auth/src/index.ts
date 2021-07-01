import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  console.log('Starting up... test deploy');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KET must be deifined');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be deifined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connecting to db success');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000!!!!!');
  });
};

start();
