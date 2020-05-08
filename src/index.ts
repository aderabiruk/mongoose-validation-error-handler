import { ErrorMessage, mongoose_error_kinds } from './type';
import { capitalize, humanize, parse_options } from './utils';
import {
    boolean_message, buffer_message,
    cast_error_message, date_message,
    enum_message, max_message,
    maxlength_message, min_message,
    minlength_message, number_message,
    object_id_message, required_message, unique_message } from './errors';


/**
 * 
 * @param {*} error 
 * @param {objet} options 
 */
let transform_mongoose_error = (error: any, options: any) => {
    let { capitalize_option, humanize_option } = parse_options(options);
    let error_messages = [];
    
    if (error.name === "ValidationError") {
        let attributes = Object.keys(error.errors);

        attributes.forEach((attribute) => {
            let kind = error.errors[attribute].kind;
            let value = error.errors[attribute].value;
            let message = error.errors[attribute].message;

            error_messages.push(process_error(kind, attribute, value, message, capitalize_option, humanize_option));
        });
    } 
    else if (error.name === "MongoError" && (error.code === 11000 || error.code === 11001)) {
        let message = error.message;
        
        /**
         * Extract attribute
         */
        let keyRegex = message.match(/index:\s+([^\s]+)/);
        let rawKey = keyRegex ? keyRegex[1]: '';
        let attribute = rawKey.substring(0, rawKey.lastIndexOf('_'));
        
        /**
         * Extract value
         */
        error_messages.push(process_error(mongoose_error_kinds.UNIQUE, attribute, '', message, capitalize_option, humanize_option));
    }
    else if (error.name === "CastError") {
        let path = error.path;
        let message = error.message;

        if (error.kind === "ObjectId" || error.kind === undefined) {
            /**
             * Extract Model
             */
            let modelRegex = message.match(/\"(.*?)\"/g);
            let model = modelRegex ? modelRegex[modelRegex.length - 1]: '';
            error_messages.push(process_error(mongoose_error_kinds.CASTERROR, path, model, message, capitalize_option, humanize_option));
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
let process_error = (kind: string, name: string, value: string, message: string, capitalize_option: boolean, humanize_option: boolean) => {
    let error: ErrorMessage = new ErrorMessage(name);

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
        case mongoose_error_kinds.UNIQUE:
            error.message = unique_message(name, value);
            break;
        case mongoose_error_kinds.CASTERROR:
            error.message = cast_error_message(name, value);
            break;
        default:
            error.message = message;
    }

    return error;
};

export default transform_mongoose_error;