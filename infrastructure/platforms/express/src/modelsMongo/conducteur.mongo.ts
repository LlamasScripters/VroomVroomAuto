import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const conducteurSchema = new mongoose.Schema(
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
        permis: {
            type: String,
            required: true,
        },
        categoriePermis: {
            type: String,
            required: true,
        },
        experience: {
            type: Number,
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
        collection: "Conducteurs",
    }
);

conducteurSchema.index(
    {
        nom: 'text',
        permis: 'text',
        categoriePermis: 'text',
        experience: 'text',
    },
    { name: 'searchIndex' }
);

const Conducteur = mongoose.model("Conducteurs", conducteurSchema);

export default Conducteur;