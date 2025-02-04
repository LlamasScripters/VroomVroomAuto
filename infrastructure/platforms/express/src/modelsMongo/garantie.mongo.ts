import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const garantieSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        panne: {
            type: {
                _id: {
                    type: String,
                    default: uuidv4,
                    required: true,
                },
            },
            required: true,
        },
        moto: {
            type: {
                _id: {
                    type: String,
                    default: uuidv4,
                    required: true,
                },
            },
            required: true,
        },
        couverture: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['Moto', 'Piece', 'Entretien'],
        },
        dateDebut: {
            type: Date,
            required: true,
        },
        dateFin: {
            type: Date,
            required: true,
        },
        statut: {
            type: String,
            required: true,
            enum: ['Active', 'Expirée', 'Utilisée'],
        },
    },
    {
        collection: "Garanties",
    }
);

garantieSchema.index(
    {
        couverture: "text",
        type: "text",
        dateDebut: "text",
        dateFin: "text",
        statut: "text",
    },
    { name: "searchIndex" }
);

const Garantie = mongoose.model("Garanties", garantieSchema);

export default Garantie;