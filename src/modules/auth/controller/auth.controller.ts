import jwt from 'jsonwebtoken';

import { NextFunction, Request, Response } from "express";
import { logger } from "@configs/logger.config";
import { loginService } from "../services/auth.service";
import { generalResponse } from "@helpers/response/generalResponse";
import { FRONT_URL, SECRET_KEY } from '@/configs/env.config';
import Auth from '@/models/Auth.model';

export const authLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const { password, email } = req.body

        const loginResponse = await loginService(req.body)
        return generalResponse(req, res, loginResponse, 'LOGIN_SUCCESS', false);
    } catch (error) {
        logger.error(`Error in authentication login ${error}`)
    }
}

export const authLogOut = async (req: Request, res: Response, next: NextFunction) => {
    try {

    } catch (error) {
        logger.error(`Error in logout the user ::: ${error}`)
    }
}

export const getLoggedInUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        let tokenLogin = req.headers["authorization"];
      
        if (tokenLogin && tokenLogin?.startsWith("Bearer")) {
            //token for the portal
            const token = tokenLogin.split(" ")[1];

            const dataPortalVerify: any = jwt.verify(token, SECRET_KEY);
            
            if (dataPortalVerify.email) {
                let userData = await Auth.findOne({email:dataPortalVerify.email});
                if (userData) {
                    return generalResponse(
                        req,
                        res,
                        {token,isSuperAdmin:true},
                        `USER_FETCHED`,
                        false,
                    );
                } else if (!userData) {
                    return res.redirect(`${FRONT_URL}/`);
                }
            }else{
                return res.redirect(`${FRONT_URL}/`)
            }


        }


    } catch (error) {
        logger.error(`Error in the get user ::: ${error}`)
    }
}
