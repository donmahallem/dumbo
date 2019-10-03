/*!
 * Source https://github.com/donmahallem/TrapezeApiExpressServer
 */
import { expect } from "chai";
import * as express from "express";
import { relative } from "path";
import * as process from "process";
import * as sinon from "sinon";
import { RouteError } from "../route-error";
import { ILocalEvent } from "./local-event";
import { LocalEventClient } from "./local-event-client";
import { LocalEventRequestHandlers } from "./local-event-request-handlers";

describe(relative(process.cwd(), __filename), () => {
    describe("LocalEventRequestHandlers", () => {
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
            beforeEach(() => {
                testInstance = LocalEventRequestHandlers.createGetLocalEventRequestHandler(testClient);
            });
            it("should call the database client with the id", (done) => {
                const testId: string = "randomtestid";
                testClient.getLocalEventById.resolves(testId as ILocalEvent);
                const responseSpy = sinon.stub();
                responseSpy.callsFake((args) => {
                    expect(args).to.deep.equal(testId);
                    expect(nextSpy.callCount).to.equal(0);
                    done();
                });
                testInstance({
                    params: { id: testId },
                } as express.Request, {
                    json: responseSpy,
                } as any, nextSpy);
            });
            it("should call the database client with the id but reject", (done) => {
                const testId: string = "randomtestid";
                const testError: RouteError = new RouteError(404, "Not found");
                testClient.getLocalEventById.rejects(testError);
                testInstance({
                    params: { id: testId },
                } as express.Request, {} as any, (args) => {
                    expect(args).to.be.instanceOf(RouteError);
                    expect(args).to.deep.equal(testError);
                    expect(nextSpy.callCount).to.equal(0);
                    done();
                });
            });
            it("should call the database client with the id but reject", (done) => {
                const testId: string = "randomtestid";
                const testError: RouteError = new RouteError(404, "No event found");
                testClient.getLocalEventById.resolves();
                testInstance({
                    params: { id: testId },
                } as express.Request, {} as any, (args) => {
                    expect(args).to.be.instanceOf(RouteError);
                    expect(args).to.deep.equal(testError);
                    expect(nextSpy.callCount).to.equal(0);
                    done();
                });
            });
            it("should be true", () => {
                const parsed = Number.parseInt(process.versions.node.substr(0, process.versions.node.indexOf("\.")));
                expect(LocalEventRequestHandlers.isNewVersion()).to.equal(parsed >= 10);
            })
        });
    });
});
