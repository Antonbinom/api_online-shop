import express from 'express';
import userRouter from '../routes/userRouter.js';
import typeRouter from '../routes/typeRouter.js';
import brandRouter from '../routes/brandRouter.js';
import deviceRouter from '../routes/deviceRouter.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);

export default router;