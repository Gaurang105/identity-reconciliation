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

async function findOrCreatePrimaryContact(email: string | null, phoneNumber: string | null) {
  let contact = await prisma.contact.findFirst({
    where: {
      OR: [
        { email: email || undefined },
        { phoneNumber: phoneNumber || undefined }
      ],
      linkPrecedence: 'primary'
    },
    orderBy: { createdAt: 'asc' }
  });

  if (!contact) {
    contact = await prisma.contact.create({
      data: {
        email,
        phoneNumber,
        linkPrecedence: 'primary'
      }
    });
  } else if ((email && email !== contact.email) || (phoneNumber && phoneNumber !== contact.phoneNumber)) {
    await prisma.contact.create({
      data: {
        email: email || undefined,
        phoneNumber: phoneNumber || undefined,
        linkedId: contact.id,
        linkPrecedence: 'secondary'
      }
    });
  }

  return contact;
}

async function findSecondaryContacts(primaryId: number) {
  return prisma.contact.findMany({
    where: {
      linkedId: primaryId,
      linkPrecedence: 'secondary'
    }
  });
}