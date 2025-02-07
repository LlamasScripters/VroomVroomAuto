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
        prenom: {
            type: String,
            required: true,
        },
        dateNaissance: {
            type: Date,
            required: true,
        },
        numeroPermis: {
            type: String,
            required: true,
        },
        categoriePermis: {
            type: String,
            required: true,
        },
        dateObtentionPermis: {
            type: Date,
            required: true,
        },
        dateValiditePermis: {
            type: Date,
            required: true,
        },
        anneeExperience: {
            type: Number,
            required: true,
        },
        telephone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        disponibilite: {
            type: String,
            required: true,
        },
        statut: {
            type: String,
            required: true,
        },
        user: {
            type: {
                _id: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        },
        dateCreation: {
            type: Date,
            required: true,
        },
        derniereModification: {
            type: Date,
            required: true,
        },
    },
    {
        collection: "Conducteurs",
    }
);

conducteurSchema.index(
    {
        nom: "text",
        prenom: "text",
        email: "text",
        telephone: "text",
    },
    { name: 'searchIndex' }
);

const Conducteur = mongoose.model("Conducteurs", conducteurSchema);

export default Conducteur;