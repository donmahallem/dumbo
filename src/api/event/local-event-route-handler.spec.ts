/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */
import * as express from "express";
import { relative } from "path";
import * as process from "process";
import * as sinon from "sinon";
import { LocalEventClient } from "./local-event-client";
import { createLocalEventRouter } from "./local-event-route-handler";
import * as supertest from "supertest";

describe(relative(process.cwd(), __filename), () => {
    describe("createLocalEventRouter", () => {
        let testClient: sinon.SinonStubbedInstance<LocalEventClient>;
        let nextSpy: sinon.SinonSpy;
        before(() => {
            nextSpy = sinon.spy();
            testClient = sinon.createStubInstance(LocalEventClient);
        });

        afterEach(() => {
            nextSpy.resetHistory();
        });
        describe("createGetLocalEventRequestHandler", () => {

            let testInstance: express.RequestHandler;
            let server: express.Application;
            beforeEach(() => {
                testInstance = createLocalEventRouter(testClient);
                server = express();
                server.use(testInstance)
            });
            it("should call the database client with the id", (done) => {
                supertest(server)
                    .get("/")
                    .expect(200)
                    .finally(done);
            });
        });
    });
});
