import express from "express"
import { authLogin, getLoggedInUser } from "../controller/auth.controller";
import validationMiddleware from "@middlewares/validationmiddleware";
import { loginSchema } from "@modules/auth/validations/auth.validation";
import authMiddleware from "@/middlewares/auth.middleware";
const authRoute=express.Router();

authRoute.post("/login",validationMiddleware(loginSchema,'body'),authLogin)
authRoute.post("/getLoggedIn",authMiddleware,getLoggedInUser)
export default authRoute