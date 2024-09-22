import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { consolidateContacts } from '../services/contactService';

const prisma = new PrismaClient();

export async function identifyContact(req: Request, res: Response) {
  try {
    const { email, phoneNumber } = req.body;

    if (!email && !phoneNumber) {
      return res.status(400).json({ error: 'Email or phone number is required' });
    }

    const consolidatedContact = await consolidateContacts(email, phoneNumber);
    res.json({ contact: consolidatedContact });
  } catch (error) {
    console.error('Error in identifyContact:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}