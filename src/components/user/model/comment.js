const { Schema, model } = require('mongoose');
const { commentValidation } = require('./commentValidation');

const commentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, required: false },
}, { timestamps: true });


commentSchema.statics.commentValidate = body => {
    return commentValidation.validate(body)
}


module.exports = model("Comment", commentSchema);