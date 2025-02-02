import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";
import { isValidEmail } from "../helpers/validatorHelper";

const userSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            validate: {
                validator: (email: string) => {
                    return isValidEmail(email);
                },
                message: "Email is not valid",
            },
        },
        role: {
            type: String,
            default: "user",
            validate: {
                validator: (role: string) => {
                    return role === "user" || role === "admin" || role === "gestionnaire";
                },
                message: "Role is not valid",
            },
            required: true,
        },
        isValidated: {
            type: Boolean,
            default: false,
        },
        dateCreation: {
            type: Date,
            default: Date.now,
        },
        derniereConnexion: {
            type: Date,
        },
    },
    {
        collection: "Users",
    }
);

userSchema.index(
    { username: "text", email: "text" },
    { name: "searchIndex" }
);

const User = mongoose.model("User", userSchema);

export default User;