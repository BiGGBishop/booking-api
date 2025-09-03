import { Router } from 'express';
import { BookingController } from '../controllers/BookingController';

const router = Router();
const bookingController = new BookingController();

router.post('/', bookingController.createBooking.bind(bookingController));
router.delete('/:id', bookingController.cancelBooking.bind(bookingController));
router.put('/:id', bookingController.updateBooking.bind(bookingController));

export default router;