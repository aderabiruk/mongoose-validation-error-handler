"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns Boolean Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
exports.boolean_message = function (attribute) {
    return "\"" + attribute + "\" must be a boolean.";
};
/**
 * Returns Buffer Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
exports.buffer_message = function (attribute) {
    return "\"" + attribute + "\" must be a buffer.";
};
/**
 * Returns Cast Error Related to Object Id Message
 *
 * @param {string} name Name of the attribute
 * @param {string} model Name of the model
 */
exports.cast_error_message = function (name, model) {
    return model + " with the provided \"" + name + "\" doesn't exist.";
};
/**
 * Returns Date Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
exports.date_message = function (attribute) {
    return "\"" + attribute + "\" must be a date.";
};
/**
 * Returns Enum Related Error Message
 *
 * @param {string} attribute    Name of the attribute
 * @param {string} value        Value of the attribute
 */
exports.enum_message = function (attribute, value) {
    return "\"" + value + "\" is an invalid value for the attribute \"" + attribute + "\".";
};
/**
 * Returns Maxlength Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
exports.maxlength_message = function (attribute) {
    return "\"" + attribute + "\" is longer than the maximum allowed length.";
};
/**
 * Returns Max Related Error Message
 *
 * @param {string} attribute    Name of the attribute
 * @param {any} value        Value of the attribute
 */
exports.max_message = function (attribute, value) {
    return value instanceof Date ? "\"" + attribute + "\" is after the maximum allowed date." : "\"" + attribute + "\" is greater than the maximum allowed value.";
};
/**
 * Returns Minlength Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
exports.minlength_message = function (attribute) {
    return "\"" + attribute + "\" is shorter than the minimum allowed length.";
};
/**
 * Returns Min Related Error Message
 *
 * @param {string} attribute Name of the attribute
 * @param {any} value        Value of the attribute
 */
exports.min_message = function (attribute, value) {
    return value instanceof Date ? "\"" + attribute + "\" is before the minimum allowed date." : "\"" + attribute + "\" is less than the minimum allowed value.";
};
/**
 * Returns Number Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
exports.number_message = function (attribute) {
    return "\"" + attribute + "\" must be a number.";
};
/**
 * Returns ObjectId Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
exports.object_id_message = function (attribute) {
    return "\"" + attribute + "\" must be an ObjectId.";
};
/**
 * Returns Required Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
exports.required_message = function (attribute) {
    return "\"" + attribute + "\" is Required.";
};
/**
 * Returns Unique Related Error Message
 *
 * @param {string} attribute Name of the attribute
 * @param {string} value Value of the attribute
 */
exports.unique_message = function (attribute, value) {
    return attribute + " already exists.";
};
