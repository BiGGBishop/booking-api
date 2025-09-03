import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { AppDataSource } from './config/database';
import propertyRoutes from './routes/properties';
import bookingRoutes from './routes/bookings';
import { setupSwagger } from './config/swagger';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

// Swagger docs
setupSwagger(app);

// Routes
app.use('/properties', propertyRoutes);
app.use('/bookings', bookingRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected');
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
      console.log(`Swagger docs available at http://localhost:${PORT}/docs`);
    });
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
    process.exit(1);
  });

export default app;