import moment from 'moment';
import { model, Schema } from 'mongoose';

let MinMaxModelSchema = new Schema({ 
    min_number: {
        type: Number,
        min: 5
    },
    max_number: {
        type: Number,
        max: 10
    },
    min_date: {
        type: Date,
        min: moment().subtract(30, 'days').startOf('day')
    },
    max_date: {
        type: Date,
        max: moment().add(30, 'days').endOf('day')
    }
});

export default model('MinMaxModel', MinMaxModelSchema);