
(function ( factory ) {
    "use strict";

    if ("function" === typeof define && define.amd) {
        define(["knockout"], factory);
    } else if ("undefined" !== typeof module) {
        module.exports = factory(require("knockout"));
    } else {
        factory(window.ko);
    }

})(function ( ko ) {
    "use strict";

    /** @namespace ko */

    var define;

    /**
     * places a function on knockout and provides
     * noConflict functionality
     * @private
     *
     * @param {string} name key on knockout to store functionality
     * @param {Function} fn functionality to supply knockout
     */
    define = function ( name, fn ) {
        var old;

        old = ko[name];
        ko[name] = fn;

        ko[name].noConflict = function ( ) {
            var temp;
            temp = ko[name];
            ko[name] = old;
            return temp;
        };
    };

    /** @namespace mutex */
    /**
     * creates an observable which behaves as a mutex
     * @static
     * @memberOf ko
     * @function mutex
     * @param {Boolean} initial=false starting value
     * @return {Object} observable with functionality
     */
    define("mutex", function ( initial ) {
        var mutex;

        // normalize initial value
        initial = Boolean(initial);

        // create the base observable
        mutex = ko.observable(initial);

        /**
         * attempts to lock the mutex
         * @memberof mutex#
         * @function try_lock
         * @return {Boolean} if the lock was successful
         */
        mutex.try_lock = function ( ) {
            if (!mutex()) {
                mutex(true);
                return true;
            }
            return false;
        };

        /**
         * alias of try_lock
         * @memberof mutex#
         * @function take
         * @return {Boolean} if the take was successful
         */
        mutex.take = mutex.try_lock;

        /**
         * attempts to unlock the mutex
         * @memberof mutex#
         * @function unlock
         * @return {Boolean} if the unlock happened
         */
        mutex.unlock = function ( ) {
            if (mutex()) {
                mutex(false);
                return true;
            }
            return false;
        };

        /**
         * alias of unlock
         * @memberof mutex#
         * @function release
         * @return {Boolean} if the release happened
         */
        mutex.release = mutex.unlock;

        return mutex;
    });

    /**
     * resets the old value at mutex
     * @memberof mutex
     * @function noConflict
     * @return {Function} mutex implementation
     */

    /** @namespace semaphore */
    /**
     * creates an observable which behaves as a semaphore
     * @static
     * @memberOf ko
     * @function semaphore
     * @param {Number} initial=1 starting value
     * @param {Boolean} strict=false semaphore will be top bound as well
     * @return {Object} observable with functionality
     */
    define("semaphore", function ( initial, strict ) {
        var semaphore;

        // normalize arguments
        initial = parseInt(initial);
        if (isNaN(initial)) { initial = 1; }

        strict = Boolean(strict);

        // create the base observable
        semaphore = ko.observable(initial);

        /**
         * attempts to decrement the semaphore
         * @memberof semaphore#
         * @function p
         * @return {Boolean} if the decrement was successful
         */
        semaphore.p = function ( ) {
            var val;

            if ( (val = semaphore()) > 0 ) {
                semaphore(val - 1);
                return true;
            }
            return false;
        };

        /**
         * alias of p
         * @memberof semaphore#
         * @function down
         * @return {Boolean} if the decrement was successful
         */
        semaphore.down = semaphore.p;

        /**
         * attempts to increment the semaphore
         * @memberof semaphore#
         * @function v
         * @return {Boolean} if the increment happened
         */
        semaphore.v = function ( ) {
            var val;

            if (strict && (val = semaphore()) >= initial) {
                return false;
            }
            semaphore(val + 1);
            return true;
        };

        /**
         * alias of v
         * @memberof semaphore#
         * @function up
         * @return {Boolean} if the increment happened
         */
        semaphore.up = semaphore.v;

        return semaphore;
    });

    /**
     * resets the old value at semaphore
     * @memberof semaphore
     * @function noConflict
     * @return {Function} semaphore implementation
     */

    // allow chained dependency for ease
    return ko;

});

