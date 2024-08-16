import { logger } from "@/configs/logger.config";
import { generalResponse } from "@/helper/response/generalResponse";
import Project from "@/models/Project.model";
import { Request, Response, NextFunction } from "express";
import {
  getProjectService,
  getSingleProjectService,
} from "../services/project.service";
import { errorMessage } from "@/common/constants/validation.constant";
import { v2 as cloudinary } from "cloudinary";
import { API_KEY, API_SECRET, CLOUD_NAME } from "@/configs/env.config";
import mongoose from "mongoose";

export const handleGetProjects = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let reponse = await getProjectService();
    return generalResponse(req, res, reponse, "GET_ALL_PROJECT", false);
  } catch (error) {
    logger.error(`Error in getting all projects ::: ${error}`);
    return false;
  }
};

export const handleGetSingleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    let reponse = await getSingleProjectService(id);
    return generalResponse(req, res, reponse, "GET_ALL_PROJECT", false);
  } catch (error) {
    logger.error(`Error in getting individule project ::: ${error}`);
  }
};

export const createHandleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      projectType,
      projectName,
      projectDescription,
      projectLocation,
      projectConstructionArea,
      projectImages,
    } = req.body;

    let uploadImages = JSON.parse(projectImages);
    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });

    let imagePromises = [];

    uploadImages.forEach((image) => {
      if (!image.id)
        imagePromises.push(
          cloudinary.uploader.upload(image, {
            folder: "JP-Projects",
          })
        );
    });

    let uploadedImages = await Promise.all(imagePromises);

    let projectAdd = await Project.findOneAndUpdate(
      { projectName },
      {
        projectName,
        projectType,
        projectLocation,
        projectDescription,
        projectConstructionArea,
        projectImages: uploadedImages,
      },
      { new: true, upsert: true }
    );

    return generalResponse(
      req,
      res,
      projectAdd,
      "CREATE_PROJECT",
      true,
      "success",
      200
    );
  } catch (error) {
    logger.error(`Error in handle Project ::: ${error}`);
    return false;
  }
};

export const upadateHandleProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const {
      projectType,
      projectName,
      projectDescription,
      projectLocation,
      projectConstructionArea,
      projectImages,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      logger.error(`Invalid project ID: ${id}`);
      return res.status(400).json({ error: "Invalid project ID" });
    }

    const currProject = await Project.findOne(
      { _id: id },
      { projectImages: 1 }
    );

    if (!currProject) {
      logger.error(`Project not found with ID: ${id}`);
      return res.status(404).json({ error: "Project not found" });
    }
    logger.verbose(
      `🚀 ~ current image in DB: ${currProject.projectImages.length}`
    );

    let uploadedImages = JSON.parse(projectImages);
    let newImages = uploadedImages.filter(
      (currImage) => typeof currImage == "string"
    );
    let removedImages = currProject.projectImages.filter(
      (currDBImage) =>
        !uploadedImages.some(
          (currFormImage) =>
            typeof currFormImage == "object" &&
            currFormImage?.id == currDBImage.asset_id
        )
    );

    // Remove the images from the array in MongoDB
    await Project.updateOne(
      { _id: id },
      {
        $pull: {
          projectImages: {
            asset_id: { $in: removedImages.map((curr) => curr.asset_id) },
          },
        },
      }
    );

    logger.verbose(`Newly selected image ::: ${newImages.length}`);
    logger.verbose(`Remove Images ::: ${removedImages.length}`);

    let imagePromises = [];
    let removePromises = [];

    cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });

    // Upload new images to Cloudinary
    const uploadPromises = newImages.map((image) =>
      cloudinary.uploader.upload(image, { folder: "JP-Projects" })
    );
    const uploadedCloudinaryImages = await Promise.all(uploadPromises);

    if (removedImages.length > 0) {
      const result = await cloudinary.api.delete_resources(
        removedImages.map((removeImage) => removeImage.public_id),
        {
          invalidate: true,
        }
      );
      logger.info("Batch delete result:", result);
    }

    console.log(
      "remooovfeee",
      removedImages.map((curr) => curr.asset_id)
    );

    let projectEdit = await Project.findOneAndUpdate(
      { _id: id },
      {
        $push: { projectImages: { $each: uploadedCloudinaryImages } },
        projectName,
        projectType,
        projectLocation,
        projectDescription,
        projectConstructionArea,
      },
      { new: true, returnOriginal: true }
    );

    return generalResponse(
      req,
      res,
      projectEdit,
      "EDIT_PROJECT",
      true,
      "success",
      200
    );
  } catch (error) {
    logger.error(`Error in update project :::: ${error}`);
    return false;
  }
};
