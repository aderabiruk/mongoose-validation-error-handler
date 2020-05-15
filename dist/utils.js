"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parse options argument and Returns an Options Object
 *
 * Options Object Definition { capitalize: Boolean, humanize: Boolean }
 *
 * @param {object} [options] Optional Object { [capitalize]: Boolean, [humanize]: Bolean }
 * @returns {object} Options Object
 */
exports.parse_options = function (options) {
    return {
        capitalize_option: options && options.capitalize ? options.capitalize : false,
        humanize_option: options && options.humanize ? options.humanize : false
    };
};
/**
 * Capitalizes the first character of a text
 *
 * @param {string} text
 * @returns {string}
 */
exports.capitalize = function (text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
};
/**
 * Replaces all underscores with a white space
 *
 * @param {string} text
 * @returns {string}
 */
exports.humanize = function (text) {
    return text.split("_").join(" ").trim();
};
/**
 * Clean Field Name
 *
 * @param {string} Field
 * @returns {string}
 */
exports.cleanField = function (field) {
    var splitted_array = field.split(".");
    return splitted_array.filter(function (value) { return !exports.isNumber(value); }).join(".");
};
/**
 * Check if String is Number
 *
 * @param {string} value
 * @returns {boolean}
 */
exports.isNumber = function (value) {
    return !/\D/.test(value);
};
