const ArgtiveEvent = require("../dist/teronis-js-event-dispatcher").ArgtiveEvent;
const assert = require("chai").assert;

describe("ArgtiveEvent", function () {
    let event;

    beforeEach(() => {
        event = new ArgtiveEvent();
    });

    const scope = {
        a: 1,
        b: 2,
        c: 3
    };

    const args = [1, 2, 3];

    describe("#invoke()", () => {
        it("attached function should trigger", (done) => {
            event.attach(() => done());
            event.invoke();
        });
    
        it("removed function should not trigger", (done) => {
            const handler = () => done(new Error("This function should be detached."));
            event.attach(handler);
            event.detach(handler);
            event.invoke();
            done();
        });

        it("arguments are passed correctly", () => {
            event.attach(function (...scopeArgs) {
                assert.deepStrictEqual(scopeArgs, args, "arguments are not passed correctly");
            });
            event.invoke(...args);
        });
    });

    describe("#call()", () => {
        it("arguments and scope are passed correctly", () => {
            event.attach(function (...scopeArgs) {
                assert.deepStrictEqual(scopeArgs, args, "arguments are not passed correctly");
                assert.deepStrictEqual(this, scope, "scope is not passed correctly");
            });
            event.call(scope, ...args);
        });
    });

    describe("#apply()", () => {
        it("arguments and scope are passed correctly", () => {
            event.attach(function (...scopeArgs) {
                assert.deepStrictEqual(scopeArgs, args, "arguments are not passed correctly");
                assert.deepStrictEqual(this, scope, "scope is not passed correctly");
            });
            event.apply(scope, args);
        });
    });

    describe("#length()", () => {
        it("length is correct", () => {
            event.attach(() => {});
            event.attach(() => {});
            const length = event.length();
            assert.deepStrictEqual(length, 2, "the length is not equals 2");
        });
    });

});