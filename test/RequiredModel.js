import { model, Schema } from 'mongoose';

let RequiredModelSchema = new Schema({ 
    required_string: {
        type: String,
        required: true
    },
    required_number: {
        type: Number,
        required: true
    },
    required_date: {
        type: Date,
        required: true
    },
    required_boolean: {
        type: Boolean,
        required: true
    },
    required_buffer: {
        type: Buffer,
        required: true
    },
    required_arrays: {
        type: Array,
        required: true
    }
});

export default model('RequiredModel', RequiredModelSchema);