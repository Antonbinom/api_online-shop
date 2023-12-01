import express from 'express';
import { create, getAll } from '../controllers/brandController.js';

const router = express.Router();

router.get('/', getAll);
router.post('/', create);

export default router;