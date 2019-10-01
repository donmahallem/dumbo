import { Request, Response, NextFunction, RequestHandler } from "express";
import { LocalEventClient } from "./local-event-client";
import { RouteError } from "../route-error";

export class LocalEventRequestHandlers {

    public static createGetLocalEventRequestHandler(client: LocalEventClient): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            if (req.params && req.params['key']) {
                return client.getLocalEventById(req.params['key']);
            } else {
                next(new RouteError(401, "Missing parameter"));
            }
        };
    }
}