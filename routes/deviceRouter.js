import express from 'express';
import { create, getAll, getOne } from '../controllers/deviceController.js';
import checkRole from '../middleware/checkRoleMiddleware.js';

const router = express.Router();

router.post('/', checkRole('ADMIN'), create);
router.get('/', getAll);
router.get('/:id', getOne);

export default router;