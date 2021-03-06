import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@bkatickets/common';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { Payment } from '../models/payment';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [body('token').not().isEmpty(), body('orderId').not().isEmpty()],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      throw new NotFoundError('Order not found');
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }

    // const charge = await stripe.charges.create({
    //   currency: 'usd',
    //   amount: order.price * 100, // dollar to cent
    //   source: token,
    // });

    // const charge = await stripe.charges.create({
    //   amount: order.price * 100, // dollar to cent
    //   currency: 'usd',
    //   description: 'Example charge',
    //   source: token,
    // });

    // TODO: stripe bug
    // const charge = await stripe.charges.create({
    //   amount: 2000,
    //   currency: 'usd',
    //   source: 'tok_amex',
    //   description: 'My First Test Charge (created for API docs)',
    // });
    const payment = await Payment.build({ orderId, stripeId: 'asdasddas' });
    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as createChargeRouter };
