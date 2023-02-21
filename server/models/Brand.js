import mongoose, { Schema, model } from "mongoose";

const Brand = new Schema({
    name: {type: String, required: true, unique: true},
});

export default mongoose.model('Brand', Brand);