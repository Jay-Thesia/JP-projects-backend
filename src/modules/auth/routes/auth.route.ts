import express from "express"
import { authLogin } from "../controller/auth.contoller";
const authRoute=express.Router();

authRoute.post("/login",authLogin)

export default authRoute