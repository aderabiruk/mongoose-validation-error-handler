import { cleanField } from "./utils";

/**
 * Mongoose Error Kinds
 */
export const mongoose_error_kinds = {
    BOOLEAN: "Boolean",
    BUFFER: "Buffer",
    CASTERROR: "CastError",
    DATE: "Date",
    ENUM: "enum",
    MAX: "max",
    MAXLENGTH: "maxlength",
    MIN: "min",
    MINLENGTH: "minlength",
    NUMBER: "Number",
    OBJECTID: "ObjectID",
    REQUIRED: "required",
    UNIQUE: "unique"
};

/**
 * Error Message Object
 */
export class ErrorMessage {
    public field: string;
    public message: string;

    constructor(field: string = "", message: string = "") {
        this.field = field;
        this.message = message;
    }

}