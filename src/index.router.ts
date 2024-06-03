import express from 'express'
import authRoute from '@modules/auth/routes/auth.route';
import projectRoute from './modules/projects/routes/project.routes';
const router=express.Router();

router.use("/authorize",authRoute);
router.use("/projects",projectRoute)

export default router