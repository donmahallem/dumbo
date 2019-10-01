import { Request, Response, NextFunction, RequestHandler } from "express";
import { LocalEventClient } from "./local-event-client";
import { RouteError } from "../route-error";
import { ILocalEvent } from "./local-event";

export class LocalEventRequestHandlers {

    public static createGetLocalEventRequestHandler(client: LocalEventClient): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            if (req.params && req.params['id']) {
                client.getLocalEventById(req.params['id'])
                    .then((event: ILocalEvent) => {
                        if (event) {
                            res.json(event);
                        } else {
                            next(new RouteError(404, "No event found"));
                        }
                    })
                    .catch((err: any) => {
                        next(err);
                    });
            } else {
                next(new RouteError(400, "Missing parameter"));
            }
        };
    }
}