/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */
import { relative } from "path";
import * as process from "process";
import { LocalEventRequestHandlers } from "./local-event-request-handlers";
import { LocalEventClient } from "./local-event-client";
import * as sinon from "sinon";
import { expect } from "chai";
import { RequestHandler, Response, Request } from "express";
import { RouteError } from "../route-error";
describe(relative(process.cwd(), __filename), () => {
    describe('LocalEventRequestHandlers', () => {
        let testClient: LocalEventClient;
        beforeEach(() => {
            testClient = sinon.createStubInstance(LocalEventClient);
        });
        describe('createGetLocalEventRequestHandler', () => {
            let requestHandler: RequestHandler;
            beforeEach(() => {
                requestHandler = LocalEventRequestHandlers.createGetLocalEventRequestHandler(testClient)
            })
            it('should fail without provided ID param', () => {
                const testRequest: Request = {

                } as Request;
                const testResponse: Response = {} as Response
                const testNext: sinon.SinonSpy = sinon.spy();
                requestHandler(testRequest, testResponse, testNext);
                expect(testNext.callCount).to.equal(1);
                expect(testNext.args[0].length).to.be.equal(1, "Only one argument should be provided to next callback");
                expect(testNext.args[0][0]).to.be.instanceOf(RouteError);
                expect(testNext.args[0][0]).to.deep.equal(new RouteError(401, "Missing parameter"));
            });
        })
    })
});
