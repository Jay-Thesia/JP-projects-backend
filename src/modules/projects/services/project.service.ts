import { logger } from "@/configs/logger.config";
import Project from "@/models/Project.model";

export const getProjectService = async () => {
  try {
    let allProjects = await Project.find({});

    return allProjects;
  } catch (error) {
    logger.error(`Error in the get project service ::: ${error}`);
  }
};
