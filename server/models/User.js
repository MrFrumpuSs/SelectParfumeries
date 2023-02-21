import mongoose, { Schema, model, ObjectId } from "mongoose";

const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    role: {type: String, default: "USER"},
});

export default mongoose.model('User', User);