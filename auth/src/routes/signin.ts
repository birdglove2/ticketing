import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest, BadRequestError } from '@bkatickets/common';

import { Password } from '../utils/password';
import { User } from '../models/user';

const router = express.Router();

const bodyChecker = [
  body('email').isEmail().withMessage('Email must be valid.'),
  body('password').trim().notEmpty().withMessage('You must provide the password'),
];

router.post(
  '/api/users/signin',
  bodyChecker,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Email or password is invalid');
    }

    const isPasswordMatched = await Password.compare(existingUser.password, password);
    if (!isPasswordMatched) {
      throw new BadRequestError('Email or password is invalid');
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
      // { expiresIn: '1h' }
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send({ message: 'You are signed in.', existingUser });
  }
);

export { router as signinRouter };
