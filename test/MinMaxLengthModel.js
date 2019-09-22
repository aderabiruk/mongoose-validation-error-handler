import { model, Schema } from 'mongoose';

let MinMaxLengthModelSchema = new Schema({ 
    minlength_string: {
        type: String,
        minlength: 3
    },
    maxlength_string: {
        type: String,
        maxlength: 8
    }
});

export default model('MinMaxLengthModel', MinMaxLengthModelSchema);