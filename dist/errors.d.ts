/**
 * Returns Boolean Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
export declare const boolean_message: (attribute: string) => string;
/**
 * Returns Buffer Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
export declare const buffer_message: (attribute: string) => string;
/**
 * Returns Cast Error Related to Object Id Message
 *
 * @param {string} name Name of the attribute
 * @param {string} model Name of the model
 */
export declare const cast_error_message: (name: string, model: string) => string;
/**
 * Returns Date Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
export declare const date_message: (attribute: string) => string;
/**
 * Returns Enum Related Error Message
 *
 * @param {string} attribute    Name of the attribute
 * @param {string} value        Value of the attribute
 */
export declare const enum_message: (attribute: string, value: string) => string;
/**
 * Returns Maxlength Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
export declare const maxlength_message: (attribute: string) => string;
/**
 * Returns Max Related Error Message
 *
 * @param {string} attribute    Name of the attribute
 * @param {any} value        Value of the attribute
 */
export declare const max_message: (attribute: string, value: any) => string;
/**
 * Returns Minlength Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
export declare const minlength_message: (attribute: string) => string;
/**
 * Returns Min Related Error Message
 *
 * @param {string} attribute Name of the attribute
 * @param {any} value        Value of the attribute
 */
export declare const min_message: (attribute: string, value: any) => string;
/**
 * Returns Number Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
export declare const number_message: (attribute: string) => string;
/**
 * Returns ObjectId Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
export declare const object_id_message: (attribute: string) => string;
/**
 * Returns Required Related Error Message
 *
 * @param {string} attribute Name of the attribute
 */
export declare const required_message: (attribute: string) => string;
/**
 * Returns Unique Related Error Message
 *
 * @param {string} attribute Name of the attribute
 * @param {string} value Value of the attribute
 */
export declare const unique_message: (attribute: string, value: string) => string;
