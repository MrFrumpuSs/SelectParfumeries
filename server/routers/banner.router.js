import { Router } from "express";
import BannerController from '../controllers/BannerController.js';
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();


router.post('/', roleMiddleware(['ADMIN']), BannerController.create);
router.patch('/:id', roleMiddleware(['ADMIN']), BannerController.update);
router.delete('/:id', roleMiddleware(['ADMIN']), BannerController.remove);
router.get('/', BannerController.getAll);
router.get('/:id', BannerController.getOne);

export default router;