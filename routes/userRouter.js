import express from 'express';
import { registration, login, auth } from '../controllers/userController.js';
import authMiddleware from '../middleware/authMiddleware.js'; //
const router = express.Router();

router.post('/registration', registration);
router.post('/login', login);
router.get('/auth', authMiddleware, auth); //Передаем вторым параметром middleware проверки авторизации

export default router;