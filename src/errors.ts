/**
 * Returns Boolean Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 */
export const boolean_message = (attribute: string): string => {
    return `"${attribute}" must be a boolean.`;
};

/**
 * Returns Buffer Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 */
export const buffer_message = (attribute: string): string => {
    return `"${attribute}" must be a buffer.`;
};

/**
 * Returns Cast Error Related to Object Id Message
 * 
 * @param {string} name Name of the attribute
 * @param {string} model Name of the model
 */
export const cast_error_message = (name: string, model: string): string => {
    return `${model} with the provided "${name}" doesn't exist.`;
};

/**
 * Returns Date Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 */
export const date_message = (attribute: string): string => {
    return `"${attribute}" must be a date.`;
};

/**
 * Returns Enum Related Error Message
 * 
 * @param {string} attribute    Name of the attribute
 * @param {string} value        Value of the attribute
 */
export const enum_message = (attribute: string, value: string): string => {
    return `"${value}" is an invalid value for the attribute "${attribute}".`;
};

/**
 * Returns Maxlength Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 */
export const maxlength_message = (attribute: string): string => {
    return `"${attribute}" is longer than the maximum allowed length.`;
};

/**
 * Returns Max Related Error Message
 * 
 * @param {string} attribute    Name of the attribute
 * @param {any} value        Value of the attribute
 */
export const max_message = (attribute: string, value: any): string => {
    return value instanceof Date ? `"${attribute}" is after the maximum allowed date.` : `"${attribute}" is greater than the maximum allowed value.`;
};

/**
 * Returns Minlength Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 */
export const minlength_message = (attribute: string): string => {
    return `"${attribute}" is shorter than the minimum allowed length.`;
};

/**
 * Returns Min Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 * @param {any} value        Value of the attribute
 */
export const min_message = (attribute: string, value: any): string => {
    return value instanceof Date ? `"${attribute}" is before the minimum allowed date.` : `"${attribute}" is less than the minimum allowed value.`;  
};

/**
 * Returns Number Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 */
export const number_message = (attribute: string): string => {
    return `"${attribute}" must be a number.`;
};

/**
 * Returns ObjectId Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 */
export const object_id_message = (attribute: string): string => {
    return `"${attribute}" must be an ObjectId.`;
};

/**
 * Returns Required Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 */
export const required_message = (attribute: string): string => {
    return `"${attribute}" is Required.`;
};

/**
 * Returns Unique Related Error Message
 * 
 * @param {string} attribute Name of the attribute
 * @param {string} value Value of the attribute
 */
export const unique_message = (attribute: string, value: string): string => {
    return `${attribute} already exists.`;
};