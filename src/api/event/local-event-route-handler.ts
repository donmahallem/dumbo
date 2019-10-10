import { Router } from "express";
import { LocalEventRequestHandlers } from "./local-event-request-handlers";
import { LocalEventClient } from "./local-event-client";


export const createLocalEventRouter: (client: LocalEventClient) => Router = (client: LocalEventClient): Router => {
    const router: Router = Router();
    router.param("local_event_id", (req, res, next, value, name) => {
        console.log("JJ", value, name);
        next();
    });
    router.get("/:local_event_id", LocalEventRequestHandlers.createGetLocalEventRequestHandler(client));
    router.post("", LocalEventRequestHandlers.createGetLocalEventRequestHandler(client));
    router.delete("/:local_event_id", LocalEventRequestHandlers.createGetLocalEventRequestHandler(client));
    router.put("/:local_event_id", LocalEventRequestHandlers.createGetLocalEventRequestHandler(client));
    router.patch("/:local_event_id", LocalEventRequestHandlers.createGetLocalEventRequestHandler(client));
    return router;
}