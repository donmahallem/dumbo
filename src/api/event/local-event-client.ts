/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */

import { ILocalEvent } from "./local-event";

export class LocalEventClient {
    public getLocalEventById(id: string): Promise<ILocalEvent> {
        return Promise.resolve(true);
    }
}
