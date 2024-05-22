import express from 'express'
import authRoute from './modules/auth/routes/auth.route';
const router=express.Router();

router.use("/auth",authRoute);

export default router