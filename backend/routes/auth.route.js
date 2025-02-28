import express from 'express'
import { registerController, loginController, logoutController } from '../controller/auth.controller.js';

const router = express.Router()

router.post('/register' , registerController ); // Registeration Route
router.post('/login' , loginController ); // Registeration Route
router.post('/logout' , logoutController ); // Registeration Route

export default router;