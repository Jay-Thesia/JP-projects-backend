import express from "express";
import authRoute from "@modules/auth/routes/auth.route";
import projectRoute from "./modules/projects/routes/project.routes";
import contactRoute from "./modules/contact/routes/contact.route";
const router = express.Router();

router.use("/authorize", authRoute);
router.use("/projects", projectRoute);
router.use("/contact", contactRoute);

export default router;
