
/* global ko, expect */
(function ( ) {
    "use strict";

    if (global.ENV === global.ENV_NODE) {
        global.ko = require("knockout");
        require("../semaphore.js");
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

        describe("ko", function ( ) {
            it("should exist", function ( ) {
                return expect(ko).to.be.ok;
            });
            it("should have mutex", function ( ) {
                return expect(ko.mutex).to.be.ok;
            });
            it("should have semaphore", function ( ) {
                return expect(ko.semaphore).to.be.ok;
            });
        });
    });

    describe("mutex", function ( ) {
        it("should be constructable", function ( ) {
            return expect(ko.mutex()).to.be.ok;
        });
        it("should ignore extra values", function ( ) {
            return expect(ko.mutex(true, 1, 2, 3)).to.be.ok;
        });
        it("should be subscribable", function ( done ) {
            var mutex;

            (mutex = ko.mutex()).subscribe(function ( locked, ignored ) {
                 ignored = expect(locked).to.be.true;
                 return done();
            });

            mutex(true);

            return void 0;
        });
        it("should allow first lock", function ( ) {
            return expect(ko.mutex().try_lock()).to.be.true;
        });
        it("should allow initial lock", function ( ) {
            return expect(ko.mutex(true).try_lock()).to.be.false;
        });
        it("should deny first unlock", function ( ) {
            return expect(ko.mutex().unlock()).to.be.false;
        });
        it("should allow initial unlock", function ( ) {
            return expect(ko.mutex(true).unlock()).to.be.true;
        });
        it("should alternate properly", function ( ) {
            var mutex, ignored;

            mutex = ko.mutex();

            ignored = expect(mutex.try_lock()).to.be.true;
            ignored = expect(mutex.unlock()).to.be.true;
            ignored = expect(mutex.try_lock()).to.be.true;
        });
        it("should deny repetition", function ( ) {
            var mutex, ignored;

            mutex = ko.mutex();

            ignored = expect(mutex.try_lock()).to.be.true;
            ignored = expect(mutex.try_lock()).to.be.false;
            ignored = expect(mutex.unlock()).to.be.true;
            ignored = expect(mutex.unlock()).to.be.false;
        });
    });

    describe("semaphore", function ( ) {
        it("should be constructable", function ( ) {
            return expect(ko.semaphore()).to.be.ok;
        });
        it("should take extra values", function ( ) {
            return expect(ko.semaphore(1, true, 1, 2, 3)).to.be.ok;
        });
        it("should be subscribable", function ( done ) {
            var semaphore;

            (semaphore = ko.semaphore()).subscribe(function ( count, ignored ) {
                 ignored = expect(count).to.equal(2);
                 return done();
            });

            semaphore(2);

            return void 0;
        });

    });


})();

