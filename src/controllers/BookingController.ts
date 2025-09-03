import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { Booking } from '../models/Booking';
import { Property } from '../models/Property';

// POST /bookings
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { property_id, user_name, start_date, end_date } = req.body;
    if (!property_id || !user_name || !start_date || !end_date) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const start = new Date(start_date);
    const end = new Date(end_date);
    if (start >= end) {
      return res.status(400).json({ error: 'start_date must be before end_date' });
    }

    const propertyRepo = AppDataSource.getRepository(Property);
    const bookingRepo = AppDataSource.getRepository(Booking);

    const property = await propertyRepo.findOneBy({ id: property_id });
    if (!property) return res.status(404).json({ error: 'Property not found' });

    // Check if within property availability
    if (start < property.available_from || end > property.available_to) {
      return res.status(400).json({ error: 'Booking dates out of property availability range' });
    }

    // Check for overlapping bookings
    const overlapping = await bookingRepo
      .createQueryBuilder('booking')
      .where('booking.propertyId = :propertyId', { propertyId: property_id })
      .andWhere('booking.start_date < :end AND booking.end_date > :start', {
        start,
        end,
      })
      .getOne();

    if (overlapping) {
      return res.status(400).json({ error: 'Booking dates overlap with an existing booking' });
    }

    // Save booking
    const newBooking = bookingRepo.create({
      property,
      user_name,
      start_date: start,
      end_date: end,
    });
    await bookingRepo.save(newBooking);

    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// DELETE /bookings/:id
export const deleteBooking = async (req: Request, res: Response) => {
  try {
    const bookingRepo = AppDataSource.getRepository(Booking);
    const booking = await bookingRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    await bookingRepo.remove(booking);
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};