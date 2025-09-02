import express from 'express';
import 'reflect-metadata';

const app = express();
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Booking API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});