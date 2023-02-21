import { Router } from "express";
import BookingController from '../controllers/BookingController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();


router.post('/', BookingController.create);
router.get('/', roleMiddleware(['ADMIN']), BookingController.getAll);

export default router;