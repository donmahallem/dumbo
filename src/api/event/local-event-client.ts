/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */

import { ILocalEvent } from "./local-event";
export interface IDeleteLocalEventResult {
    id: string;
    deleted: true;
}
export class LocalEventClient {
    public getLocalEventById(id: string): Promise<ILocalEvent> {
        return Promise.resolve({});
    }

    public deleteLocalEventById(id: string): Promise<IDeleteLocalEventResult> {
        return Promise.resolve({
            deleted: true,
            id,
        });
    }
}
