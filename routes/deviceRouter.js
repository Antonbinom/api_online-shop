import express from 'express';
import { create, getAll, getOne } from '../controllers/deviceController.js';

const router = express.Router();

router.post('/', create);
router.get('/', getAll);
router.get('/:id', getOne);

export default router;