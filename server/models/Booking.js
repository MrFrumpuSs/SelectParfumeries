import mongoose, { Schema, model } from "mongoose";

const Booking = new Schema({
    brand: {type: String, required: true},
    aroma: {type: String, required: true},
    size: {type: Number, required: true},
    quantity: {type: Number, required: true},
    fio: {type: String, required: true},
    number: {type: String, required: true},
    email: {type: String},
});


export default mongoose.model('Booking', Booking);