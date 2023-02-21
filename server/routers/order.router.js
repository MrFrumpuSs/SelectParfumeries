import { Router } from "express";
import OrderController from '../controllers/OrderController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();


router.post('/', OrderController.create);
//router.patch('/:id', roleMiddleware(['ADMIN']), ParfumController.update);
//router.delete('/:id', roleMiddleware(['ADMIN']), ParfumController.remove);
router.get('/', roleMiddleware(['ADMIN']), OrderController.getAll);
router.get('/:id', OrderController.getOne);

export default router;