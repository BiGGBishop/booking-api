import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Property } from '../entities/Property';
import { Booking } from '../entities/Booking';

// GET /properties
export const getAllProperties = async (req: Request, res: Response) => {
  try {
    const propertyRepo = AppDataSource.getRepository(Property);
    const properties = await propertyRepo.find();
    res.json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
};

// GET /properties/:id/availability
export const getPropertyAvailability = async (req: Request, res: Response) => {
  try {
    const propertyRepo = AppDataSource.getRepository(Property);
    const bookingRepo = AppDataSource.getRepository(Booking);

    const property = await propertyRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!property) {
      return res.status(404).json({ error: 'Property not found' });
    }

    const bookings = await bookingRepo.find({
      where: { property: { id: property.id } },
      order: { start_date: 'ASC' },
    });

    res.json({
      property,
      bookings,
      message: 'Booked dates are listed; availability is outside these ranges.',
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
};
