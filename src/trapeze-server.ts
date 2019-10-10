/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */

import * as express from "express";
import { Server } from "http";
import { IServerConfig } from "./config";
import { createLocalEventRouter } from "./api/event/local-event-route-handler";
export const api404Handler: express.RequestHandler = (req: express.Request,
    res: express.Response,
    next: express.NextFunction): void => {
    res.status(404).json({
        statusCode: 404,
    });
};
export const serverErrorHandler: express.ErrorRequestHandler = (err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction) => {
    if (err.statusCode) {
        res.status(err.statusCode).json({
            error: true,
            message: err.message,
            statusCode: err.statusCode,
        });
        let reqUrl: string = "unknown";
        let reqMethod: string = "unknown";
        if (err.options) {
            reqUrl = err.options.url;
            reqMethod = err.options.method;
        }
        // tslint:disable-next-line:no-console
        console.error("proxy", err.statusCode, reqMethod, reqUrl);
        return;
    }
    // tslint:disable-next-line:no-console
    console.error(err);
    res.status(500).json({ error: true });
};
export class TrapezeServer {
    private app: express.Application;
    private server: Server;
    constructor(public readonly config: IServerConfig) {
        this.app = express();
        this.app.param("arg", (req, res, next, val, nam) => {
            console.log("val", val, nam);
            next()
        })
        this.app.get("", (req, res) => {
            res.json({})
        });
        this.app.get("/id/:arg", (req, res) => {
            res.json({
                ar: true
            })
        })
        this.app.use("/event", createLocalEventRouter(undefined as any))
        this.app.use(serverErrorHandler);
    }

    public start(): Promise<void> {
        return new Promise((resolve, reject): void => {
            this.server = this.app.listen(this.config.port, (err?: any) => {
                console.info("Server started on ", this.config.port);
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    public stop() {
        this.server.close((err) => {
            // tslint:disable-next-line:no-console
            console.log("Server closed", err);
        });
    }
}
