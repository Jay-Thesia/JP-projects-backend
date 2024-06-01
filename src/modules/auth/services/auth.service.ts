import { logger } from "@configs/logger.config"
import { LoginInterface, UserInterface } from "../interfaces/auth.interfaces";
import { HttpException } from "@helpers/response/httpException";
import * as bcrypt from 'bcrypt';
import Auth from "@models/Auth.model";
import jwt from "jsonwebtoken"
import { SECRET_KEY } from "@configs/env.config";


const checkPassword = async (data: LoginInterface, user: UserInterface) => {
    if (!user.password) throw new HttpException(400, 'PASSWORD_NOT_SET');
    const isMatch = await bcrypt.compare(data.password, JSON.parse(JSON.stringify(user)).password);
    if (isMatch) return true;
    else throw new HttpException(400, 'PASSWORD_ERROR', null, true);
  };

  const createToken =async (user: UserInterface) => {
    return jwt.sign({ email: user.email, userId: user._id }, SECRET_KEY, { expiresIn: '1d' });
  };

export const loginService=async (data:LoginInterface)=>{
    try {
        const {email}=data
       
        const user:any = await Auth.findOne({email})
      

        if(user){
            const passwordCheck=await checkPassword(data,user);

            if(passwordCheck){
                return {
                    access_token:await createToken(user)
                }
            }
        }else throw new HttpException(400, 'REGISTER_FIRST', null, true);
      
        
    } catch (error) {
        logger.error(`Error in login service ::: ${error}`)
    }
}