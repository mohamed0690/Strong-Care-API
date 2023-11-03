import mongoose from "mongoose";

const contactUsSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            minLength: [
                2,
                "Name is too short (minimum length is 2 characters).",
            ],
            required: [true, "First name is required."],
        },
        email: {
            type: String,
            required: [true, "Email is required."],
        },
        phone: {
            type: String,
            required: [true, "Phone number is required."],
        },
        message: {
            type: String, minLength: [
                15, "message is too short (minimum length is 15 characters).",
            ],
            required: [true, "message is required."],
        },

    },
    { timestamps: true }
);

export const ContactUS = mongoose.model("ContactUS", contactUsSchema);
