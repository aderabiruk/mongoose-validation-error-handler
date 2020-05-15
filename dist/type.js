"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Mongoose Error Kinds
 */
exports.mongoose_error_kinds = {
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
var ErrorMessage = /** @class */ (function () {
    function ErrorMessage(field, message) {
        if (field === void 0) { field = ""; }
        if (message === void 0) { message = ""; }
        this.field = field;
        this.message = message;
    }
    return ErrorMessage;
}());
exports.ErrorMessage = ErrorMessage;
