import { Request, Response, NextFunction } from 'express';

export function validateIdentifyRequest(req: Request, res: Response, next: NextFunction) {
  const { email, phoneNumber } = req.body;

  if (!email && !phoneNumber) {
    return res.status(400).json({ error: 'Email or phone number is required' });
  }

  if (email && typeof email !== 'string') {
    return res.status(400).json({ error: 'Email must be a string' });
  }

  if (phoneNumber && typeof phoneNumber !== 'string') {
    return res.status(400).json({ error: 'Phone number must be a string' });
  }

  next();
}