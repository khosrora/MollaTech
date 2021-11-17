const { model, Schema } = require('mongoose');

const attributeSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: false },
    discount: { type: String, default: "off" },
    count: { type: Number, default: 1 },
})




module.exports = model("Attribute", attributeSchema)