import mongoose, { Schema, model } from "mongoose";

const Parfum = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    characteristics: [
        {
            left: {type: String, required: true},
            right: {type: String, required: true},
        }
    ],
    variations: [
        {
            quantity: {type: String, required: true},
            price: {type: Number, required: true},
            sale: {type: Number}
        }
    ],
    img: {type: Array, default: 'default.jpeg'},
    sex: {type: String, required: true, default: "MAN"},
    brand: {type: Schema.Types.ObjectId, ref: 'Brand'},
    sale: {type: Boolean, default: false},
    sales: {type: Number, default: 0 },
    raspiv: {type: Boolean, default: false},
    reviews: [{type: Schema.Types.ObjectId, ref: "Review"}]
});

export default mongoose.model('Parfum', Parfum);