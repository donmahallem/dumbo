/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */

import { NextFunction, Request, RequestHandler, Response } from "express";

export const createRefreshTokenEndpoint: (config: any) => RequestHandler = (config: any): RequestHandler =>
    (req: Request, res: Response, next: NextFunction) => {
        if (req.method) {
            next();
        }
        next();
    };
