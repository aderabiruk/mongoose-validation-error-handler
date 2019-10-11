import { capitalize, humanize, parse_options } from './utils';

/**
 * Mongoose Error Kinds
 */
const mongoose_error_kinds = {
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
let transform_mongoose_error = (error, options) => {
    let { capitalize_option, humanize_option } = parse_options(options);
        let error_messages = [];
        let attributes = Object.keys(error.errors);

        if (error.name === "ValidationError") {
            attributes.forEach((attribute) => {
                let kind = error.errors[attribute].kind;
                let value = error.errors[attribute].value;
                let message = error.errors[attribute].message;
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
let process_error = (kind, name, value, message, capitalize_option, humanize_option) => {
    let error = { field: name, message: "" };
    name = capitalize_option ? capitalize(name) : name;
    name = humanize_option ? humanize(name) : name;

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
let boolean_message = (attribute) => {
    return `'${attribute}' must be a boolean.`;
};

/**
 * Returns Buffer Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let buffer_message = (attribute) => {
    return `'${attribute}' must be a buffer.`;
};

/**
 * Returns Date Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let date_message = (attribute) => {
    return `'${attribute}' must be a date.`;
};

/**
 * Returns Enum Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let enum_message = (attribute, value) => {
    return `'${value}' is an invalid value for the attribute '${attribute}'.`;
};

/**
 * Returns Maxlength Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let maxlength_message = (attribute) => {
    return `'${attribute}' is longer than the maximum allowed length.`;
};

/**
 * Returns Max Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let max_message = (attribute, value) => {
    return value instanceof Date ? `'${attribute}' is after the maximum allowed date.` : `'${attribute}' is greater than the maximum allowed value.`;
};

/**
 * Returns Minlength Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let minlength_message = (attribute) => {
    return `'${attribute}' is shorter than the minimum allowed length.`;
};

/**
 * Returns Min Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let min_message = (attribute, value) => {
    return value instanceof Date ? `'${attribute}' is before the minimum allowed date.` : `'${attribute}' is less than the minimum allowed value.`;  
};

/**
 * Returns Number Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let number_message = (attribute) => {
    return `'${attribute}' must be a number.`;
};

/**
 * Returns ObjectId Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let object_id_message = (attribute) => {
    return `'${attribute}' must be an ObjectId.`;
};

/**
 * Returns Required Related Error Message
 * 
 * @param {String} attribute Name of the attribute
 */
let required_message = (attribute) => {
    return `'${attribute}' is Required.`;
};

module.exports = transform_mongoose_error;
