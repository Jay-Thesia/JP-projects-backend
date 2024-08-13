import express from "express";
import {
  handleGetProjects,
  createHandleProject,
  upadateHandleProject,
} from "../contorller/project.conroller";

const projectRoute = express.Router();

projectRoute.get("/getAll", handleGetProjects);
projectRoute.post("/add", createHandleProject);
projectRoute.patch("/add/:id", upadateHandleProject);

export default projectRoute;
