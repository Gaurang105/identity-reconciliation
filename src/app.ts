import express from 'express';
import { identifyContact } from './controllers/identifyController';

const app = express();
app.use(express.json());

app.post('/identify', identifyContact);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;