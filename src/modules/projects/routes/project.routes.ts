import express from 'express'
import { handleProject } from '../contorller/project.conroller';

const projectRoute=express.Router();

projectRoute.post("/add",handleProject)

export default projectRoute