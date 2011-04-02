/**
 * @fileOverview log.js testcase
 * @name test_log.js
 * @author Kei Funagayama <kei.topaz@gmail.com>
 * @license APL v2
 */

var testCase = require('nodeunit').testCase;
var log = require('../lib/log');

var testCase = module.exports = testCase({

    setUp: function(callback) {
        callback();
    },

    tearDown: function(callback) {
        callback();
    },

    console: function(test) {
        test.expect(0);
        var log_ = log.getLogger("test", true, '=');
        log_.debug("hoge", "foo");
        log_.debug("hoge", "foo");
        console.log({'name':[1,2,3,4,5,6]});
        test.done();
    },

    file: function(test) {
        test.expect(0);
        log.setConfigure(
            {
                "appenders": [
                    {
                        "category": "tests",
                        "type": "file",
                        "filename": "/tmp/nlog4js-nodeunit.log",
                        "maxLogSize": 1024,
                        "backups": 3,
                        "pollInterval": 15
                    }
                ],
                "levels": {
                    "tests":  "ALL"
                }
            });
        var log_ = log.getLogger("tests", ':');

        log_.trace("trace", "foo");
        log_.debug("debug:", "foo");
        log_.info("info", "foo");
        log_.warn("warn:", "foo");
        log_.error("error:", "foo");
        log_.fatal("fatal", "foo");

        test.done();
    }
});
