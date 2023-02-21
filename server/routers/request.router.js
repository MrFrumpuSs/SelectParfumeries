import { Router } from "express";
import RequestController from '../controllers/RequestController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();


router.post('/', RequestController.create);
router.get('/', roleMiddleware(['ADMIN']), RequestController.getAll);

export default router;