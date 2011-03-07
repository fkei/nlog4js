/**
 * @fileOverview Logging module. (Dependence log4js)
 * @name log.js
 * @author Kei Funagayama
 * @license APLv2
 */

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
function output(params, separator) {
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
	return params.join(separator_);
};

/**
 * Load the configuration file for log4js.
 * @param {String} configure Setting file path.
 */
var setConfigure = exports.setConfigure = function(configure) {
	log4js.configure(configure);
};

/**
 * Gets the logger.
 * @param {String} category Log category
 * @returns {function} Log Class
 */
var getLogger = exports.getLogger = function(category, separator) {
	var log = new Log();
	log.logger = log4js.getLogger(category);
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
Log.prototype.trace = function(separator) {
    this.logger.trace(output(arguments, this.separator));
};

/**
 * Debug log output.
 */
Log.prototype.debug = function() {
    this.logger.debug(output(arguments, this.separator));
};

/**
 * Info log output.
 */
Log.prototype.info = function() {
    this.logger.info(output(arguments, this.separator));
};

/**
 * Warn log output.
 */
Log.prototype.warn = function() {
	debugger;
	this.logger.warn(output(arguments, this.separator));
};

/**
 * Error log output.
 */
Log.prototype.error = function() {
    this.logger.error(output(arguments, this.separator));
};

/**
 * Fatal log output.
 */
Log.prototype.fatal = function() {
    this.logger.fatal(output(arguments, this.separator));
};
