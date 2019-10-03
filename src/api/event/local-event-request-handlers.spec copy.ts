/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */
import { expect } from "chai";
import * as express from "express";
import { relative } from "path";
import * as process from "process";
import * as sinon from "sinon";
import * as supertest from "supertest";
import { RouteError } from "../route-error";
import { ILocalEvent } from "./local-event";
import { LocalEventClient } from "./local-event-client";
import { LocalEventRequestHandlers } from "./local-event-request-handlers";

describe(relative(process.cwd(), __filename), () => {
    describe("LocalEventRequestHandlers", () => {
        let testClient: sinon.SinonStubbedInstance<LocalEventClient>;
        let app: express.Application;
        let nextSpy: sinon.SinonSpy;
        let server: any;
        before((done) => {
            app = express();
            server = app.listen(done);
            nextSpy = sinon.spy();
            testClient = sinon.createStubInstance(LocalEventClient);
        });

        after((done) => {
            server.close(done);
        });
        afterEach(() => {
            nextSpy.resetHistory();
        });
        describe("createGetLocalEventRequestHandler", () => {
            before(() => {
                const a = LocalEventRequestHandlers.createGetLocalEventRequestHandler(testClient);
                app.get("/:id", a);
                app.get("/", a);
                app.use((err, req, res: express.Response, next) => {
                    nextSpy(err);
                    if (err instanceof RouteError) {
                        res.status(err.status);
                    }
                    res.json({});
                });

            });
            it("should call the database client with the id", () => {
                const testId: string = "randomtestid";
                testClient.getLocalEventById.resolves(testId as ILocalEvent);
                return supertest(app)
                    .get("/" + testId)
                    .expect(200)
                    .expect((res: supertest.Response) => {
                        expect(res.body).to.equal(testId);
                        expect(testClient.getLocalEventById.callCount)
                            .to.be.equal(1, "datbase should be called only once");
                    });
            });
        });
    });
});
