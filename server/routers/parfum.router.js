import { Router } from "express";
import ParfumController from '../controllers/ParfumController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();


router.post('/', roleMiddleware(['ADMIN']), ParfumController.create);
router.patch('/:id', roleMiddleware(['ADMIN']), ParfumController.update);
router.delete('/:id', roleMiddleware(['ADMIN']), ParfumController.remove);
router.get('/', ParfumController.getAll);
router.get('/:id', ParfumController.getOne);

export default router;