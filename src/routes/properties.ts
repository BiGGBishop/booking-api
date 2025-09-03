import { Router } from 'express';
import { getAllProperties, getPropertyAvailability } from '../controllers/propertiesController';

const router = Router();

/**
 * @openapi
 * /properties:
 *   get:
 *     summary: Get all properties
 *     responses:
 *       200:
 *         description: List of all properties
 */
router.get('/', getAllProperties);

/**
 * @openapi
 * /properties/{id}/availability:
 *   get:
 *     summary: Get availability of a property
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Availability dates for a property
 */
router.get('/:id/availability', getPropertyAvailability);

export default router;
