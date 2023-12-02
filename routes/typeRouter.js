import express from 'express';
import { create, getAll } from '../controllers/typeController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

const router = express.Router();
router.get('/', getAll);
router.post('/', checkRole('ADMIN'), create); //проверяем что пользователь это АДМИН

export default router;