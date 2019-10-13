"use strict";

var _utils = require("./utils");

/**
 * Mongoose Error Kinds
 */
var mongoose_error_kinds = {
  BOOLEAN: "Boolean",
  BUFFER: "Buffer",
  DATE: "Date",
  ENUM: "enum",
  MAX: "max",
  MAXLENGTH: "maxlength",
  MIN: "min",
  MINLENGTH: "minlength",
  NUMBER: "Number",
  OBJECTID: "ObjectID",
  REQUIRED: "required"
};
/**
 * 
 * @param {*} error 
 * @param {Object} options 
 */

var transform_mongoose_error = function transform_mongoose_error(error, options) {
  var _parse_options = (0, _utils.parse_options)(options),
      capitalize_option = _parse_options.capitalize_option,
      humanize_option = _parse_options.humanize_option;

  var error_messages = [];
  var attributes = Object.keys(error.errors);

  if (error.name === "ValidationError") {
    attributes.forEach(function (attribute) {
      var kind = error.errors[attribute].kind;
      var value = error.errors[attribute].value;
      var message = error.errors[attribute].message;
      error_messages.push(process_error(kind, attribute, value, message, capitalize_option, humanize_option));
    });
  }

  return error_messages;
};
/**
 * Returns an Error Message Object
 * 
 * Error Message Object Definition: {field: attribute_name, message: 'customized error message' }
 * 
 * @param {String} kind Mongoose Validation Error Kind
 * @param {String} name Name
 * @param {String} value Value
 * @param {String} message Default Message
 * @param {Boolean} capitalize_option Capitalize Name
 * @param {Boolean} humanize_option Humanize Name
 * @returns {Object} Error Message Object
 */


var process_error = function process_error(kind, name, value, message, capitalize_option, humanize_option) {
  var error = {
    field: name,
    message: ""
  };
  name = capitalize_option ? (0, _utils.capitalize)(name) : name;
  name = humanize_option ? (0, _utils.humanize)(name) : name;

  switch (kind) {
    case mongoose_error_kinds.BOOLEAN:
      error.message = boolean_message(name);
      break;

    case mongoose_error_kinds.BUFFER:
      error.message = buffer_message(name);
      break;

    case mongoose_error_kinds.DATE:
      error.message = date_message(name);
      break;

    case mongoose_error_kinds.ENUM:
      error.message = enum_message(name, value);
      break;

    case mongoose_error_kinds.MAX:
      error.message = max_message(name, value);
      break;

    case mongoose_error_kinds.MAXLENGTH:
      error.message = maxlength_message(name);
      break;

    case mongoose_error_kinds.MIN:
      error.message = min_message(name, value);
      break;

    case mongoose_error_kinds.MINLENGTH:
      error.message = minlength_message(name);
      break;

    case mongoose_error_kinds.NUMBER:
      error.message = number_message(name);
      break;

    case mongoose_error_kinds.OBJECTID:
      error.message = object_id_message(name);
      break;

    case mongoose_error_kinds.REQUIRED:
      error.message = required_message(name);
      break;

    default:
      error.message = message;
  }

  return error;
};
/**
 * Returns Boolean Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var boolean_message = function boolean_message(attribute) {
  return "'".concat(attribute, "' must be a boolean.");
};
/**
 * Returns Buffer Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var buffer_message = function buffer_message(attribute) {
  return "'".concat(attribute, "' must be a buffer.");
};
/**
 * Returns Date Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var date_message = function date_message(attribute) {
  return "'".concat(attribute, "' must be a date.");
};
/**
 * Returns Enum Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var enum_message = function enum_message(attribute, value) {
  return "'".concat(value, "' is an invalid value for the attribute '").concat(attribute, "'.");
};
/**
 * Returns Maxlength Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var maxlength_message = function maxlength_message(attribute) {
  return "'".concat(attribute, "' is longer than the maximum allowed length.");
};
/**
 * Returns Max Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var max_message = function max_message(attribute, value) {
  return value instanceof Date ? "'".concat(attribute, "' is after the maximum allowed date.") : "'".concat(attribute, "' is greater than the maximum allowed value.");
};
/**
 * Returns Minlength Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var minlength_message = function minlength_message(attribute) {
  return "'".concat(attribute, "' is shorter than the minimum allowed length.");
};
/**
 * Returns Min Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var min_message = function min_message(attribute, value) {
  return value instanceof Date ? "'".concat(attribute, "' is before the minimum allowed date.") : "'".concat(attribute, "' is less than the minimum allowed value.");
};
/**
 * Returns Number Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var number_message = function number_message(attribute) {
  return "'".concat(attribute, "' must be a number.");
};
/**
 * Returns ObjectId Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var object_id_message = function object_id_message(attribute) {
  return "'".concat(attribute, "' must be an ObjectId.");
};
/**
 * Returns Required Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */


var required_message = function required_message(attribute) {
  return "'".concat(attribute, "' is Required.");
};

module.exports = transform_mongoose_error;