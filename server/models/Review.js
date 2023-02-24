import mongoose, { Schema, model } from "mongoose";

const Review = new Schema({
    parfum_id: {type: Schema.Types.ObjectId, ref: 'Parfum'},
    fio: {type: String, required: true},
    email: {type: String},
    text: {type: String, required: true},
    img: {type: Array},
});


export default mongoose.model('Review', Review);