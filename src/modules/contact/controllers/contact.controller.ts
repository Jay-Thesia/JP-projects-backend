import { logger } from "@/configs/logger.config";
import { generalResponse } from "@/helper/response/generalResponse";
import { NextFunction, Request, Response } from "express";

export const enquiryForm = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = req.body;
    console.log("🚀 ~ inquryForm ~ data:", data);

    return generalResponse(
      req,
      res,
      data,
      "CREATE_PROJECT",
      true,
      "success",
      200
    );
  } catch (error) {
    logger.error(`Error in the enquiryForm form ::: ${error}`);
    return false;
  }
};
