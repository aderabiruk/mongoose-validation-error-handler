import { model, Schema } from 'mongoose';

let TypeModelSchema = new Schema({ 
    type_array: {
        type: Array
    },
    type_boolean: {
        type: Boolean
    },
    type_buffer: {
        type: Buffer
    },
    type_date: {
        type: Date
    },
    type_number: {
        type: Number
    },
    type_object_id: {
        type: Schema.Types.ObjectId
    },
    type_string: {
        type: String
    },
    type_string_enum: {
        type: String,
        enum: [ "A", "B", "C"]
    }
});

export default model('TypeModel', TypeModelSchema);