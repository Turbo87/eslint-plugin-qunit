/**
 * @fileoverview Ensure async hooks are resolved in QUnit tests.
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/resolve-async"),
    RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("resolve-async", rule, {

    valid: [
        // stop()/start()
        "test('name', function () { stop(); start(); });",
        "asyncTest('name', function () { start(); });",
        "QUnit.test('name', function () { stop(); start(); });",
        "QUnit.asyncTest('name', function () { start(); });",
        "test('name', function () { QUnit.stop(); QUnit.start(); });",
        "asyncTest('name', function () { QUnit.start(); });",
        "QUnit.test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.asyncTest('name', function () { QUnit.start(); });",

        "module('name', { setup: function () { stop(); start(); } });",
        "QUnit.module('name', { setup: function () { stop(); start(); } });",
        "module('name', { setup: function () { QUnit.stop(); QUnit.start(); } });",
        "QUnit.module('name', { setup: function () { QUnit.stop(); QUnit.start(); } });",
        "module('name', { teardown: function () { stop(); start(); } });",
        "QUnit.module('name', { teardown: function () { stop(); start(); } });",
        "module('name', { teardown: function () { QUnit.stop(); QUnit.start(); } });",
        "QUnit.module('name', { teardown: function () { QUnit.stop(); QUnit.start(); } });",
        "module('name', { beforeEach: function () { stop(); start(); } });",
        "QUnit.module('name', { beforeEach: function () { stop(); start(); } });",
        "module('name', { beforeEach: function () { QUnit.stop(); QUnit.start(); } });",
        "QUnit.module('name', { beforeEach: function () { QUnit.stop(); QUnit.start(); } });",
        "module('name', { afterEach: function () { stop(); start(); } });",
        "QUnit.module('name', { afterEach: function () { stop(); start(); } });",
        "module('name', { afterEach: function () { QUnit.stop(); QUnit.start(); } });",
        "QUnit.module('name', { afterEach: function () { QUnit.stop(); QUnit.start(); } });",

        // stop()/start() with semaphore args
        "test('name', function () { stop(2); start(); start(); });",
        "test('name', function () { stop(); stop(); start(2); });",
        "asyncTest('name', function () { stop(1); start(); start(); });",
        "asyncTest('name', function () { stop(); stop(); start(3); });",
        "QUnit.test('name', function () { stop(2); start(); start(); });",
        "QUnit.test('name', function () { stop(); stop(); start(2); });",
        "QUnit.asyncTest('name', function () { stop(1); start(); start(); });",
        "QUnit.asyncTest('name', function () { stop(); stop(); start(3); });",

        "module('name', { setup: function () { stop(2); start(); start(); } });",
        "QUnit.module('name', { setup: function () { stop(2); start(); start(); } });",
        "module('name', { setup: function () { QUnit.stop(2); QUnit.start(); QUnit.start(); } });",
        "QUnit.module('name', { setup: function () { QUnit.stop(2); QUnit.start(); QUnit.start(); } });",
        "module('name', { teardown: function () { stop(); start(); start(); } });",
        "QUnit.module('name', { teardown: function () { stop(); start(); start(); } });",
        "module('name', { teardown: function () { QUnit.stop(); QUnit.start(); QUnit.start(); } });",
        "QUnit.module('name', { teardown: function () { QUnit.stop(); QUnit.start(); QUnit.start(); } });",
        "module('name', { beforeEach: function () { stop(); start(); start(); } });",
        "QUnit.module('name', { beforeEach: function () { stop(); start(); start(); } });",
        "module('name', { beforeEach: function () { QUnit.stop(); QUnit.start(); QUnit.start(); } });",
        "QUnit.module('name', { beforeEach: function () { QUnit.stop(); QUnit.start(); QUnit.start(); } });",
        "module('name', { afterEach: function () { stop(); start(); start(); } });",
        "QUnit.module('name', { afterEach: function () { stop(); start(); start(); } });",
        "module('name', { afterEach: function () { QUnit.stop(); QUnit.start(); QUnit.start(); } });",
        "QUnit.module('name', { afterEach: function () { QUnit.stop(); QUnit.start(); QUnit.start(); } });",

        // assert.async()
        "test('name', function (assert) { var done = assert.async(); done(); });",
        "QUnit.test('name', function (assert) { var done = assert.async(); done(); });",
        "test('name', function (assert) { var done; done = assert.async(); done(); });",
        "QUnit.test('name', function (assert) { var done; done = assert.async(); done(); });",

        "module('name', { setup: function () { var done = assert.async(); done(); } });",
        "QUnit.module('name', { setup: function () { var done = assert.async(); done(); } });",
        "module('name', { teardown: function () { var done = assert.async(); done(); } });",
        "QUnit.module('name', { teardown: function () { var done = assert.async(); done(); } });",
        "module('name', { beforeEach: function () { var done = assert.async(); done(); } });",
        "QUnit.module('name', { beforeEach: function () { var done = assert.async(); done(); } });",
        "module('name', { afterEach: function () { var done = assert.async(); done(); } });",
        "QUnit.module('name', { afterEach: function () { var done = assert.async(); done(); } });",

        // start/stop calls outside of test context should not affect count
        "start(); test('name', function () { stop(); start(); });",
        "stop(); test('name', function () { stop(); start(); });",
        "start(); asyncTest('name', function () { start(); });",
        "stop(); asyncTest('name', function () { start(); });",
        "start(); QUnit.test('name', function () { stop(); start(); });",
        "stop(); QUnit.test('name', function () { stop(); start(); });",
        "start(); QUnit.asyncTest('name', function () { start(); });",
        "stop(); QUnit.asyncTest('name', function () { start(); });",
        "QUnit.start(); test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.stop(); test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.start(); asyncTest('name', function () { QUnit.start(); });",
        "QUnit.stop(); asyncTest('name', function () { QUnit.start(); });",
        "QUnit.start(); QUnit.test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.stop(); QUnit.test('name', function () { QUnit.stop(); QUnit.start(); });",
        "QUnit.start(); QUnit.asyncTest('name', function () { QUnit.start(); });",
        "QUnit.stop(); QUnit.asyncTest('name', function () { QUnit.start(); });",

        // assert.async() calls outside of test context should not matter
        "var done = assert.async(); QUnit.test('name', function (assert) {});",
        "var done = assert.async(); QUnit.test('name', function (assert) { done(); });",
        "var done1 = assert.async(); QUnit.test('name', function (assert) { var done2 = assert.async(); done2(); });",

        // async calls can be done using a different variable
        "QUnit.test('name', function (foo) { var done = foo.async(); done(); });",
        "QUnit.test('name', function (foo) { var done; done = assert.async(); });",

        // module properties that aren't hooks should not be flagged
        "QUnit.module({ someProp: function () { QUnit.stop(); } });",
        "QUnit.module({ someProp: function (assert) { assert.async(); } });"
    ],

    invalid: [
        // stop()/start()
        {
            code: "asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module('name', { setup: function () { QUnit.stop(); } });",
            errors: [{
                message: "Need 1 more start() call",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module('name', { teardown: function () { QUnit.stop(); } });",
            errors: [{
                message: "Need 1 more start() call",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module('name', { beforeEach: function () { QUnit.stop(); } });",
            errors: [{
                message: "Need 1 more start() call",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module('name', { afterEach: function () { QUnit.stop(); } });",
            errors: [{
                message: "Need 1 more start() call",
                type: "Property"
            }]
        },

        // Multiple start() calls needed
        {
            code: "asyncTest('name', function () { stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { stop(); stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { QUnit.stop(); stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () { stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { stop(); stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { stop(); QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "asyncTest('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function () { QUnit.stop(); QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.asyncTest('name', function () { QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function () { QUnit.stop(); QUnit.stop(); });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module('name', { setup: function () { QUnit.stop(); QUnit.stop(); } });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module('name', { teardown: function () { QUnit.stop(); QUnit.stop(); } });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module('name', { beforeEach: function () { QUnit.stop(); QUnit.stop(); } });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module('name', { afterEach: function () { QUnit.stop(); QUnit.stop(); } });",
            errors: [{
                message: "Need 2 more start() calls",
                type: "Property"
            }]
        },

        // assert.async()
        {
            code: "test('name', function (assert) { var done = assert.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done = assert.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done; done = assert.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done; done = assert.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module({ setup: function (assert) { var done = assert.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ teardown: function (assert) { var done = assert.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ beforeEach: function (assert) { var done = assert.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ afterEach: function (assert) { var done = assert.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ setup: function (assert) { var done; done = assert.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ teardown: function (assert) { var done; done = assert.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ beforeEach: function (assert) { var done; done = assert.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ afterEach: function (assert) { var done; done = assert.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        },

        // Multiple assert.async() calls
        {
            code: "test('name', function (assert) { var done1 = assert.async(), done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done1 = assert.async(), done2 = assert.async(); });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "CallExpression"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done1 = assert.async(), done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done1 = assert.async(), done2 = assert.async(); });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "CallExpression"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "test('name', function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "CallExpression"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('name', function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "CallExpression"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module({ setup: function (assert) { var done1 = assert.async(), done2 = assert.async(); done1(); } });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ setup: function (assert) { var done1 = assert.async(), done2 = assert.async(); } });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "Property"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ setup: function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); done1(); } });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ setup: function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); } });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "Property"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ teardown: function (assert) { var done1 = assert.async(), done2 = assert.async(); done1(); } });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ teardown: function (assert) { var done1 = assert.async(), done2 = assert.async(); } });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "Property"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ teardown: function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); done1(); } });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ teardown: function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); } });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "Property"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ beforeEach: function (assert) { var done1 = assert.async(), done2 = assert.async(); done1(); } });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ beforeEach: function (assert) { var done1 = assert.async(), done2 = assert.async(); } });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "Property"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ beforeEach: function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); done1(); } });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ beforeEach: function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); } });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "Property"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ afterEach: function (assert) { var done1 = assert.async(), done2 = assert.async(); done1(); } });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ afterEach: function (assert) { var done1 = assert.async(), done2 = assert.async(); } });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "Property"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ afterEach: function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); done1(); } });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },
        {
            code: "QUnit.module({ afterEach: function (assert) { var done1, done2; done1 = assert.async(); done2 = assert.async(); } });",
            errors: [{
                message: "Async callback \"done1\" is not called",
                type: "Property"
            }, {
                message: "Async callback \"done2\" is not called",
                type: "Property"
            }]
        },

        // start/stop calls outside of test context should not affect count
        {
            code: "start(); asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "start(); test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "stop(); asyncTest('name', function () {});",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "stop(); test('name', function () { stop(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },

        // assert.async() calls outside of test context should not matter
        {
            code: "var done = assert.async(); asyncTest('name', function () { done(); });",
            errors: [{
                message: "Need 1 more start() call",
                type: "CallExpression"
            }]
        },
        {
            code: "var done1 = assert.async(); QUnit.test('name', function (assert) { var done2 = assert.async(); done1(); });",
            errors: [{
                message: "Async callback \"done2\" is not called",
                type: "CallExpression"
            }]
        },

        // async calls can be done using a different variable
        {
            code: "QUnit.test('name', function (foo) { var done = foo.async(); });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.module({ setup: function (foo) { var done = foo.async(); } });",
            errors: [{
                message: "Async callback \"done\" is not called",
                type: "Property"
            }]
        }
    ]

});
