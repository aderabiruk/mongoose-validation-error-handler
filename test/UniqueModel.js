import { model, Schema } from 'mongoose';

let UniqueSchema = new Schema({ 
    unique_attribute_1: {
        type: String,
        unique: true
    }
});

export default model('Unique', UniqueSchema);