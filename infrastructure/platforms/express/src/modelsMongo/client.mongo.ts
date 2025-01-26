import mongoose from "mongoose";
import { isValidEmail } from "../helpers/validatorHelper";
import { v4 as uuidv4 } from "uuid";

const clientSchema = new mongoose.Schema( 
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        nom: {
            type: String,
            required: true,
        },
        prenom: {
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
        telephone: {
            type: String,
            required: true,
        },
        user: {
            type: {
                _id: {
                    type: String,
                    default: uuidv4,
                    required: true,
                }
            },
            required: true,
        }
    },
    {
        collection: "Clients",
    }
);

clientSchema.index(
    {
        nom: 'text', 
        prenom: 'text', 
        email: 'text',
        telephone: 'text',
    },
    {name: 'searchIndex'}
);

const Client = mongoose.model("Clients", clientSchema);

export default Client;