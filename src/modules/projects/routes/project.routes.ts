import express from "express";
import {
  handleGetProjects,
  createHandleProject,
  upadateHandleProject,
} from "../contorller/project.conroller";
import authMiddleware from "@/middlewares/auth.middleware";

const projectRoute = express.Router();

projectRoute.get("/getAll", authMiddleware, handleGetProjects);
projectRoute.post("/add", authMiddleware, createHandleProject);
projectRoute.patch("/add/:id", authMiddleware, upadateHandleProject);

export default projectRoute;
