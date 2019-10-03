/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */

import { NextFunction, Request, RequestHandler, Response } from "express";
import { RouteError } from "../route-error";
import { ILocalEvent } from "./local-event";
import { IDeleteLocalEventResult, LocalEventClient } from "./local-event-client";

export class LocalEventRequestHandlers {

    public static createGetLocalEventRequestHandler(client: LocalEventClient): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            client.getLocalEventById(req.params.eventId)
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
        };
    }
    public static createDeleteLocalEventRequestHandler(client: LocalEventClient): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            if (req.method === "delete") {
                client.deleteLocalEventById(req.params.eventId)
                    .then((event: IDeleteLocalEventResult) => {
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
                next(new RouteError(400, "Invalid method"));
            }
        };
    }
    public static createValidateLocalEventIdMiddleware(): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            if (req.params && req.params.eventId) {
                next();
            } else {
                next(new RouteError(400, "No event id provided"));
            }
        };
    }

    public static isNewVersion(): boolean {
        return Number.parseInt(process.versions.node) >= 10;
    }
}
