"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var type_1 = require("./type");
var utils_1 = require("./utils");
var errors_1 = require("./errors");
/**
 *
 * @param {*} error
 * @param {objet} options
 */
var transform_mongoose_error = function (error, options) {
    var _a = utils_1.parse_options(options), capitalize_option = _a.capitalize_option, humanize_option = _a.humanize_option;
    var error_messages = [];
    if (error.name === "ValidationError") {
        var attributes = Object.keys(error.errors);
        attributes.forEach(function (attribute) {
            var kind = error.errors[attribute].kind;
            var value = error.errors[attribute].value;
            var message = error.errors[attribute].message;
            error_messages.push(process_error(kind, attribute, value, message, capitalize_option, humanize_option));
        });
    }
    else if (error.name === "MongoError" && (error.code === 11000 || error.code === 11001)) {
        var message = error.message;
        /**
         * Extract attribute
         */
        var keyRegex = message.match(/index:\s+([^\s]+)/);
        var rawKey = keyRegex ? keyRegex[1] : '';
        var attribute = rawKey.substring(0, rawKey.lastIndexOf('_'));
        /**
         * Extract value
         */
        error_messages.push(process_error(type_1.mongoose_error_kinds.UNIQUE, attribute, '', message, capitalize_option, humanize_option));
    }
    else if (error.name === "CastError") {
        var path = error.path;
        var message = error.message;
        if (error.kind === "ObjectId" || error.kind === undefined) {
            /**
             * Extract Model
             */
            var modelRegex = message.match(/\"(.*?)\"/g);
            var model = modelRegex ? modelRegex[modelRegex.length - 1] : '';
            error_messages.push(process_error(type_1.mongoose_error_kinds.CASTERROR, path, model, message, capitalize_option, humanize_option));
        }
        else {
            error_messages.push(message);
        }
    }
    else if (error.message) {
        error_messages.push(error.message);
    }
    else {
        error_messages.push(error);
    }
    return error_messages;
};
/**
 * Returns an Error Message Object
 *
 * Error Message Object Definition: {field: attribute_name, message: 'customized error message' }
 *
 * @param {string} kind Mongoose Validation Error Kind
 * @param {string} name Name
 * @param {string} value Value
 * @param {string} message Default Message
 * @param {boolean} capitalize_option Capitalize Name
 * @param {boolean} humanize_option Humanize Name
 *
 * @returns {object} Error Message Object
 */
var process_error = function (kind, name, value, message, capitalize_option, humanize_option) {
    name = utils_1.cleanField(name);
    var error = new type_1.ErrorMessage(name);
    name = capitalize_option ? utils_1.capitalize(name) : name;
    name = humanize_option ? utils_1.humanize(name) : name;
    switch (kind) {
        case type_1.mongoose_error_kinds.BOOLEAN:
            error.message = errors_1.boolean_message(name);
            break;
        case type_1.mongoose_error_kinds.BUFFER:
            error.message = errors_1.buffer_message(name);
            break;
        case type_1.mongoose_error_kinds.DATE:
            error.message = errors_1.date_message(name);
            break;
        case type_1.mongoose_error_kinds.ENUM:
            error.message = errors_1.enum_message(name, value);
            break;
        case type_1.mongoose_error_kinds.MAX:
            error.message = errors_1.max_message(name, value);
            break;
        case type_1.mongoose_error_kinds.MAXLENGTH:
            error.message = errors_1.maxlength_message(name);
            break;
        case type_1.mongoose_error_kinds.MIN:
            error.message = errors_1.min_message(name, value);
            break;
        case type_1.mongoose_error_kinds.MINLENGTH:
            error.message = errors_1.minlength_message(name);
            break;
        case type_1.mongoose_error_kinds.NUMBER:
            error.message = errors_1.number_message(name);
            break;
        case type_1.mongoose_error_kinds.OBJECTID:
            error.message = errors_1.object_id_message(name);
            break;
        case type_1.mongoose_error_kinds.REQUIRED:
            error.message = errors_1.required_message(name);
            break;
        case type_1.mongoose_error_kinds.UNIQUE:
            error.message = errors_1.unique_message(name, value);
            break;
        case type_1.mongoose_error_kinds.CASTERROR:
            error.message = errors_1.cast_error_message(name, value);
            break;
        default:
            error.message = message;
    }
    return error;
};
exports.default = transform_mongoose_error;
