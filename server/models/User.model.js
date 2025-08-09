import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    cartItems : {
        type: Object,
        default: {},
    },
}, {
    minimize: false,
    timestamps: true,
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;