# Identity Reconciliation Service

## Overview

This service provides an API endpoint for identifying and consolidating customer contacts across multiple purchases. It's designed to solve the challenge of linking different orders made with varying contact information to the same person.

## Features

- Create and link customer contacts based on email and phone number
- Identify primary and secondary contacts
- Consolidate contact information from multiple entries
- RESTful API endpoint for easy integration

## Tech Stack

- Node.js
- TypeScript
- Express.js
- Prisma ORM
- PostgreSQL

## API Documentation

### Endpoint: POST /identify

Identifies and consolidates contact information based on the provided email and/or phone number.

#### Request Body

```json
{
"email": string | null,
"phoneNumber": string | null
}
```

At least one of `email` or `phoneNumber` must be provided.

### Response

```json
{
  "contact": {
    "primaryContactId": number,
    "emails": string[],
    "phoneNumbers": string[],
    "secondaryContactIds": number[]
  }
}
```


## Deployment

This service is deployed on Render.com and can be accessed at: ```https://identity-reconciliation-t2d6.onrender.com```

To test the API, use the following endpoint: ```https://identity-reconciliation-t2d6.onrender.com/identify```