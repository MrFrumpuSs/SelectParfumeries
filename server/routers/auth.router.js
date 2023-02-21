import { Router } from "express";
import AuthController from '../controllers/AuthController.js';
import {check} from 'express-validator';
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = new Router();

router.post('/registration',
    [
        check('email', "Неверный email").isEmail(),
        check('password', "Пароль должен быть длинною 6-20 символов").isLength({min: 6, max: 20}),
    ],
    AuthController.register
);
router.post('/login', AuthController.login);
router.get('/auth', authMiddleware, AuthController.auth);

export default router;