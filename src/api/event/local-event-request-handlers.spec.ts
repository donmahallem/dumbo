/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */
import { relative } from "path";
import * as process from "process";
import { LocalEventRequestHandlers } from "./local-event-request-handlers";
import { LocalEventClient } from "./local-event-client";
import * as sinon from "sinon";
import { expect } from "chai";
import * as express from "express";
import { RouteError } from "../route-error";
import * as supertest from "supertest";

describe(relative(process.cwd(), __filename), () => {
    describe('LocalEventRequestHandlers', () => {
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
            server.close(done)
        })
        afterEach(() => {
            nextSpy.resetHistory();
        });
        describe('createGetLocalEventRequestHandler', () => {
            before(() => {
                const a = LocalEventRequestHandlers.createGetLocalEventRequestHandler(testClient)
                app.get("/:id", a);
                app.get("/", a);
                app.use((err, req, res: express.Response, next) => {
                    nextSpy(err);
                    if (err instanceof RouteError) {
                        res.status(err.status)
                    }
                    res.json({})
                })

            })
            it('should fail without provided ID param', () => {
                const testId: string = "randomtestid";
                testClient.getLocalEventById.resolves(testId)
                return supertest(app)
                    .get("/")
                    .expect(400)
                    .expect(() => {
                        expect(nextSpy.args[0][0]).to.be.instanceOf(RouteError);
                    })
            });
            it('should call the database client with the id', () => {
                const testId: string = "randomtestid";
                testClient.getLocalEventById.resolves(testId)
                return supertest(app)
                    .get("/" + testId)
                    .expect(200)
                    .expect((val) => {
                        expect(1).to.equal(1);
                    })
            });
        })
    })
});
