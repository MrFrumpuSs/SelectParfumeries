import mongoose, { Schema, model } from "mongoose";

const Order = new Schema({
    name: {type: String, required: true},
    sname: {type: String, required: true},
    number: {type: String, required: true},
    email: {type: String},
    adress: {type: String, required: true},
    cart: [
        {
            id: {type: Schema.Types.ObjectId, ref: 'Parfum', required: true},
            variation: {type: String, required: true},
            count: {type: Number, required: true}
        }
    ],
    price: {type: Number, required: true},
    status: {type: String, default: 'pending'}
});

export default mongoose.model('Order', Order);

