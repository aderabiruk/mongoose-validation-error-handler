"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.humanize = exports.capitalize = exports.parse_options = void 0;

/**
 * Parse options argument and Returns an Options Object
 * 
 * Options Object Definition { capitalize: Boolean, humanize: Boolean }
 * 
 * @param {Object} [options] Optional Object { [capitalize]: Boolean, [humanize]: Bolean } 
 * @returns {Object} Options Object 
 */
var parse_options = function parse_options(options) {
  return {
    capitalize_option: options && options.capitalize ? options.capitalize : false,
    humanize_option: options && options.humanize ? options.humanize : false
  };
};
/**
 * Capitalizes the first character of a text
 * 
 * @param {String} text 
 * @returns {String}
 */


exports.parse_options = parse_options;

var capitalize = function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
/**
 * Replaces all underscores with a white space
 * 
 * @param {String} text 
 * @returns {String}
 */


exports.capitalize = capitalize;

var humanize = function humanize(text) {
  return text.split("_").join(" ").trim();
};

exports.humanize = humanize;