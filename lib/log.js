/**
 * @fileOverview Logging module. (Dependence log4js)
 * @name log.js
 * @author Kei Funagayama <kei.topaz@gmail.com>
 * @license APL v2
 */

var consoleLog = console.log; // Shelter
var log4js = require('log4js')();

function none() {};

/**
 * Log Class
 */
function Log() {
};

module.exports.Log = Log;

/**
 * Create an output message.
 * @param {Array} params Output messages.
 * @returns {String} Output message. 
 */
function output(params, line, separator) {
	var separator_ = ' ';
	if (separator) {
		separator_ = separator;
	}
	if (params instanceof String) {
		params = [params];
	} else {
		params = Array.prototype.slice.call(params);
	}
	
	for (var i = 0; i < params.length; i++) {
		if (params[i] instanceof Error) {
			var err = params[i];
			if (err.stack)
				params[i] = err.stack;
			else
				params[i] = err.message;
		}
	}

	
    var linemsg = null;
	if (line) {
		var stack = new Error().stack;
		var lines = stack.split('\n');
		if (lines[3]) {
			var line = lines[3];
			var idx = line.lastIndexOf('/');
			if (idx >= 0) {
				linemsg = line.substring(idx);
				if (linemsg.charAt(linemsg.length-1) != ')')
					linemsg = ' (' + linemsg + ')';
				else
					linemsg = ' (' + linemsg;
			}
		}
	}
	return params.join(separator_) + linemsg;
};

/**
 * Load the configuration file for log4js.
 * @param {String} configure Setting file path.
 */
var setConfigure = exports.setConfigure = function(configure, enableConsole) {
	log4js.configure(configure);
	if (enableConsole) {
		console.log = consoleLog;
	}
};

/**
 * Express#Connect connectLogger
 */
var connectLogger = exports.connectLogger = log4js.connectLogger;

/**
 * Gets the logger.
 * @param {String} category Log category
 * @returns {function} Log Class
 */
var getLogger = exports.getLogger = function(category, line, separator) {
	var log = new Log();
	log.logger = log4js.getLogger(category);
	log.line = line;
	log.separator = separator;
	

	if (log.logger.level.levelStr === log4js.levels['TRACE'].levelStr)
		log.all = none;
	if (log.logger.level.levelStr === log4js.levels['DEBUG'].levelStr)
		log.all = log.trace = none;
	if (log.logger.level.levelStr === log4js.levels['INFO'].levelStr)
		log.all = log.trace = log.debug = none;
	if (log.logger.level.levelStr === log4js.levels['WARN'].levelStr)
		log.all = log.trace = log.debug = log.info = none;
	if (log.logger.level.levelStr === log4js.levels['ERROR'].levelStr)
		log.all = log.trace = log.debug = log.info = log.warn = none;
	if (log.logger.level.levelStr === log4js.levels['FATAL'].levelStr)
		log.all = log.trace = log.debug = log.info = log.warn = log.error_ = none;
	if (log.logger.level.levelStr === log4js.levels['OFF'].levelStr)
		log.all = log.trace = log.debug = log.info = log.warn = log.error = log.fatal = none;

	return log;
};

/**
 * Trace log output.
 */
Log.prototype.trace = function() {
    this.logger.trace(output(arguments, this.line, this.separator));
};

/**
 * Debug log output.
 */
Log.prototype.debug = function() {
    this.logger.debug(output(arguments, this.line, this.separator));
};

/**
 * Info log output.
 */
Log.prototype.info = function() {
    this.logger.info(output(arguments, this.line, this.separator));
};

/**
 * Warn log output.
 */
Log.prototype.warn = function() {
	this.logger.warn(output(arguments, this.line, this.separator));
};

/**
 * Error log output.
 */
Log.prototype.error = function() {
    this.logger.error(output(arguments, this.line, this.separator));
};

/**
 * Fatal log output.
 */
Log.prototype.fatal = function() {
    this.logger.fatal(output(arguments, this.line, this.separator));
};
