import { Router } from "express";
import ReviewController from '../controllers/ReviewController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();


router.post('/', ReviewController.create);

export default router;