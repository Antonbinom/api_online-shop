import express from 'express';
import { userRegistration, userLogin, userAuth } from '../controllers/userController.js';
const router = express.Router();

router.post('/registration', userRegistration);
router.post('/login', userLogin);
router.get('/auth', userAuth);

export default router;