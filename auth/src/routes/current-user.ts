import express, { Request, Response } from 'express';

import { currentUser } from '@bkatickets/common';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null }); // if req.currentUser === undefined, send null instead
});

export { router as currentUserRouter };
