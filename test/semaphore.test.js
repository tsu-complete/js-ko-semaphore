
/* global ko, expect */
(function ( ) {
    "use strict";

    if (global.ENV === global.ENV_NODE) {
        global.ko = require("knockout");
    }

    describe("environment", function ( ) {
        it("should have window", function ( ) {
            return expect(window).to.be.ok;
        });
        it("should have global", function ( ) {
            return expect(global).to.be.ok;
        });
        it("should have env", function ( ) {
            return expect(global.ENV).to.be.ok;
        });
        it("should have ko", function ( ) {
             return expect(ko).to.be.ok;
        });
    });
})();

