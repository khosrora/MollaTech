const { model, Schema } = require('mongoose');

const attributeSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    timeDiscount: { type: String, required: true },
    color: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: false },
    discount: { type: String, default: "off" },
    discountSpecial: { type: String, default: "off" },
    count: { type: Number, default: 1 },
    image: { type: String, required: false },
})




module.exports = model("Attribute", attributeSchema)