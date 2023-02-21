import { Router } from "express";
import BrandController from '../controllers/BrandController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();


router.post('/', roleMiddleware(['ADMIN']), BrandController.create);
router.patch('/:id', roleMiddleware(['ADMIN']), BrandController.update);
router.delete('/:id', roleMiddleware(['ADMIN']), BrandController.remove);
router.get('/', BrandController.getAll);
router.get('/:id', BrandController.getOne);

export default router;