import express from 'express';
import { create, getAll } from '../controllers/brandController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', checkRole('ADMIN'), create);

export default router;