/**
 * Mongoose Error Kinds
 */
export declare const mongoose_error_kinds: {
    BOOLEAN: string;
    BUFFER: string;
    CASTERROR: string;
    DATE: string;
    ENUM: string;
    MAX: string;
    MAXLENGTH: string;
    MIN: string;
    MINLENGTH: string;
    NUMBER: string;
    OBJECTID: string;
    REQUIRED: string;
    UNIQUE: string;
};
/**
 * Error Message Object
 */
export declare class ErrorMessage {
    field: string;
    message: string;
    constructor(field?: string, message?: string);
}
