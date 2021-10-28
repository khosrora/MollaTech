const { Schema, model } = require('mongoose');



const blogSchema = new Schema({

    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    images: { type: String, required: true },
    items: [{ type: String, required: true }]

}, { timestamps: true })

module.exports = model("Blog", blogSchema);