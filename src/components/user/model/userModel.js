const { Schema, model } = require('mongoose');
const { userValidation } = require('./userValidation');


const userSchema = new Schema({

    fullname: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    password: { type: String, required: true },
    isBloocked: { type: Boolean, default: false },
    isAdmin: { type: String, enum: ["User", "Admin", "Assistant"], default: "User" },
    mobileActiveCode: { type: Number, required: true },
    isMobileActive: { type: Boolean, default: false },
    Newsletters: { type: Number, default: 0 },
    address: { type: String, required: false },
    fav: [{ type: Schema.Types.ObjectId, ref: "Product" }]

}, { timestamps: true });


userSchema.statics.userValidate = body => {
    return userValidation.validate(body)
}

module.exports = model("User", userSchema);