const { Schema, model } = require('mongoose');
const { blogValidation } = require('./blogValidation');


const blogSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true },
    slug: { type: String, required: true },
    desc: { type: String, required: true },
    image: { type: String, required: true },
    items: [{ type: String, required: true }],
    view: { type: Number, default: 0 },
}, { timestamps: true })

blogSchema.statics.blogValidate = body => {
    return blogValidation.validate(body)
}

module.exports = model("Blog", blogSchema);