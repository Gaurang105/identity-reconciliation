import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function consolidateContacts(email: string | null, phoneNumber: string | null) {
  let primaryContact = await findOrCreatePrimaryContact(email, phoneNumber);
  let secondaryContacts = await findSecondaryContacts(primaryContact.id);

  const allContacts = [primaryContact, ...secondaryContacts];
  const emails = [...new Set(allContacts.map(c => c.email).filter(Boolean))];
  const phoneNumbers = [...new Set(allContacts.map(c => c.phoneNumber).filter(Boolean))];

  return {
    primaryContactId: primaryContact.id,
    emails,
    phoneNumbers,
    secondaryContactIds: secondaryContacts.map(c => c.id)
  };
}