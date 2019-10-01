import { RequestHandler, Request, Response, NextFunction } from "express";

export const createRefreshTokenEndpoint: (config: any) => RequestHandler = (config: any): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (req.method)
    }
}