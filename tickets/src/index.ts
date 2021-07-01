import mongoose from 'mongoose';
import { app } from './app';
import { natsWrapper } from './nats-wrapper';
import { randomBytes } from 'crypto';
import { OrderCreatedListener } from './events/listeners/order-created-listerner';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const start = async () => {
  console.log('making changes3...');
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KET must be deifined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be deifined');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_URL must be deifined');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be deifined');
  }

  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_URL must be deifined');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    new OrderCreatedListener(natsWrapper.client).listen();
    new OrderCancelledListener(natsWrapper.client).listen();

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
