const { model, Schema } = require('mongoose');

const discountSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    isActive: { type: Boolean, default: false },
})




module.exports = model("Discount", discountSchema)