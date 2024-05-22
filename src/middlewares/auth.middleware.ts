import { HttpException } from "../helper/response/httpException";
import { NextFunction, Request, Response } from 'express';
import _ from 'lodash';
import passport from 'passport';
// By Pass Url
const byPassUrls = ['test'];

const checkInclude = (req:Request) => {
    return byPassUrls.find((a) => req.url.includes(a));
  };

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
      if (checkInclude(req) && _.isUndefined(req.headers['authorization'])) {
        next();
      } else {
        passport.authenticate('jwt', (err: Error, user: any) => {
          if (err) return next(err);
          if (checkInclude(req)) {
            if (user) setUserData(req, user);
            next();
          } else if (!user) throw new HttpException(401, 'INVALID_TOKEN', true);
          else {
            setUserData(req, user);
            return next();
          }
        })(req, res, next);
      }
    } catch (error) {
      throw new HttpException(401, 'INVALID_TOKEN', true);
    }
  };

  const setUserData = (req:any, user:any) => {
    const byPassVerifications = ['/2FA/verify', '/2FA/qr', 'set-password'];
  
    if (user && !user?.verified && !byPassVerifications.find((a) => req.url.includes(a)))
      throw new HttpException(401, 'INVALID_TOKEN');
  
    req.tokenData = {
      user: user,
    };
  };

  export default authMiddleware;