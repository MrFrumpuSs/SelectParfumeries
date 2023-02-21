import mongoose, { Schema, model } from "mongoose";

const Request = new Schema({
    aroma: {type: String, required: true},
    fio: {type: String, required: true},
    number: {type: String, required: true},
    email: {type: String},
});


export default mongoose.model('Request', Request);