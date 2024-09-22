import express from 'express';
import { identifyContact } from './controllers/identifyController';
import { validateIdentifyRequest } from './middleware/validation';

const app = express();
app.use(express.json());

app.post('/identify', validateIdentifyRequest, identifyContact);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;