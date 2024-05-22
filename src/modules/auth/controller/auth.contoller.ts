import { NextFunction, Request, Response } from "express";
import { logger } from "../../../config/logger.config";
import Auth from "../../../models/Auth.model";

export const authLogin =async  (req: Request, res: Response, next: NextFunction) => {
    try {
        await Auth.create({username:"curr"})
    } catch (error) {
        logger.error(`Error in authentication login ${error}`)
    }
}