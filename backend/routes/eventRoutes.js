import express from 'express';
import { createEvent, getAllEvents } from '../controllers/eventController.js';
import { protectOrganizer } from "../middlewares/organizerMiddleware.js"

const router = express.Router();

// Event Create karne ke liye Organizer Token chahiye
router.post('/create', protectOrganizer, createEvent);

// Event dekhne ke liye koi rok-tok nahi (Students ke liye)
router.get('/all', getAllEvents);

export default router;