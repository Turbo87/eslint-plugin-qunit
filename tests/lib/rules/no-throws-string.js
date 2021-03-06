/**
 * @fileoverview forbid assert.throws() with block, string, and message
 * @author Kevin Partington
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-throws-string"),
    RuleTester = require("eslint").RuleTester;


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();

ruleTester.run("no-throws-string", rule, {
    valid: [
        // No qualification
        "QUnit.test('a test', function (assert) { assert.throws(function () { }, 'Error should have been thrown'); });",
        "QUnit.test('a test', function () { throws(function () { }, 'Error should have been thrown'); });",
        "QUnit.test('a test', function (assert) { assert.raises(function () { }, 'Error should have been thrown'); });",

        // Regexp qualification
        "QUnit.test('a test', function (assert) { assert.throws(function () { }, /regexp/, 'Error should have been thrown'); });",
        "QUnit.test('a test', function () { throws(function () { }, /regexp/, 'Error should have been thrown'); });",
        "QUnit.test('a test', function (assert) { assert.raises(function () { }, /regexp/, 'Error should have been thrown'); });",

        // Function qualification
        "QUnit.test('a test', function (assert) { assert.throws(function () { }, function (err) { return true; }, 'Error should have been thrown'); });",
        "QUnit.test('a test', function () { throws(function () { }, function (err) { return true; }, 'Error should have been thrown'); });",
        "QUnit.test('a test', function (assert) { assert.raises(function () { }, function (err) { return true; }, 'Error should have been thrown'); });",

        // Not throws/raises
        "QUnit.test('a test', function (assert) { assert.foo(function () { }, 'string', 'Error should have been thrown'); });",

        // Not inside a test
        "someFunction();"
    ],

    invalid: [
        {
            code: "QUnit.test('a test', function (assert) { assert.throws(function () { }, 'Error message', 'Error should have been thrown'); });",
            errors: [{
                message: "Do not use assert.throws(block, string, string).",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('a test', function (assert) { assert.raises(function () { }, 'Error message', 'Error should have been thrown'); });",
            errors: [{
                message: "Do not use assert.raises(block, string, string).",
                type: "CallExpression"
            }]
        },
        {
            code: "QUnit.test('a test', function () { throws(function () { }, 'Error message', 'Error should have been thrown'); });",
            errors: [{
                message: "Do not use throws(block, string, string).",
                type: "CallExpression"
            }]
        }
    ]
});
