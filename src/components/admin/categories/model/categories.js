const { Schema, model } = require('mongoose');



const categorySchema = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: false }
}, { timestamps: true });

module.exports = model("Category", categorySchema);