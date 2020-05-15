import { model, Schema } from 'mongoose';

export const ItemSchema = new Schema({
    product: {
		type: String,
        required: true
    },
    quantity: {
        type: Number,
		required: true
    }
});

let ArrayModelSchema = new Schema({ 
    array: {
        type: Array
    },
    array_number: [{ type: Number }],
    array_boolean: [{type: Boolean}],
    array_buffer: [{type: Buffer}],
    array_date: [{type: Date}],
    array_object_id: [{type: Schema.Types.ObjectId}],
    array_items: {
        type: [ItemSchema],
        required: true
    }
});

export default model('ArrayModel', ArrayModelSchema);