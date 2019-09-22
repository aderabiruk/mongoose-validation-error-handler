import { model, Schema } from 'mongoose';

let UserDefinedValidationModelSchema = new Schema({ 
    array_validator_with_message: {
        type: Array,
        validate: {
            validator: function(values) {
                return values.length > 0;
            },
            message: "Array must contain a value"
        }
    },
    array_validator_with_no_message: {
        type: Array,
        validate: {
            validator: function(values) {
                return values.length > 0;
            }
        }
    },
});

export default model('UserDefinedValidationModel', UserDefinedValidationModelSchema);