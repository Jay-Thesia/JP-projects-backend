import express from "express";
import {
  handleGetProjects,
  createHandleProject,
  upadateHandleProject,
  handleGetSingleProject,
} from "../contorller/project.conroller";
import authMiddleware from "@/middlewares/auth.middleware";

const projectRoute = express.Router();

projectRoute.get("/getAll", handleGetProjects);
projectRoute.get("/:id", handleGetSingleProject);
projectRoute.post("/add", authMiddleware, createHandleProject);
projectRoute.patch("/add/:id", authMiddleware, upadateHandleProject);

export default projectRoute;
