import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/index-errors';

import { User } from '../models/user';

const router = express.Router();

const bodyChecker = [
  body('email').isEmail().withMessage('Email must be valid.'),
  body('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Password must be between 4 and 20 characters.'),
];

router.post(
  '/api/users/signup',
  bodyChecker,
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new BadRequestError('Email is in use.');
    }

    const user = User.build({ email, password });
    await user.save();

    // // Generate JWT
    // const userJwt = jwt.sign(
    //   {
    //     id: user.id,
    //     email: user.email,
    //   },
    //   process.env.JWT_KEY!,
    //   { expiresIn: '1h' }
    // );

    // // Store it on session object
    // req.session = {
    //   jwt: userJwt,
    // };

    res.status(201).send({ message: 'Create a user successfully.', user });
  }
);

export { router as signupRouter };
