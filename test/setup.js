
/* global chai */
(function ( ) {
    "use strict";

    if ("undefined" !== typeof window) {
        window.global = window;
    } else {
        global.window = global;
    }

    global.ENV_NODE = "node";
    global.ENV_BROWSER = "browser";

    if ("undefined" !== typeof process) {
        global.chai = require("chai");
        global.ENV = global.ENV_NODE;
    } else {
        global.ENV = global.ENV_BROWSER;
    }

    global.expect = chai.expect;
    global.assert = chai.assert;

})( );

