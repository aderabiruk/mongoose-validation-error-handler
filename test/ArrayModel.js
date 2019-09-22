import { model, Schema } from 'mongoose';

let ArrayModelSchema = new Schema({ 
    array: {
        type: Array
    },
    array_number: [{ type: Number }],
    array_boolean: [{type: Boolean}],
    array_buffer: [{type: Buffer}],
    array_date: [{type: Date}],
    array_object_id: [{type: Schema.Types.ObjectId}],
});

export default model('ArrayModel', ArrayModelSchema);