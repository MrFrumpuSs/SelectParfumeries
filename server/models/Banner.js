import mongoose, { Schema, model } from "mongoose";

const Banner = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    btnname: {type: String, required: true},
    img: {type: String, default: 'default.jpeg'},
    link: {type: String, required: true},
    white: {type: Boolean, default: false}
});

export default mongoose.model('Banner', Banner);