import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const commandeSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
        },
        dateCommande: {
            type: Date,
            default: Date.now,
        },
        piece: {
            type: {
                _id: {
                    type: String,
                    default: uuidv4,
                    required: true,
                }
            },
            required: true,
        },
        quantiteCommandee: {
            type: Number,
            required: true,
        },
        coutTotal: {
            type: Number,
            required: true,
        },
        dateLivraison: {
            type: Date,
            default: Date.now,
        },
        statutCommande: {
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
        collection: "Commandes",
    }
);

commandeSchema.index(
    {
        email: 'text',
        dateCommande: 'text',
        quantiteCommandee: 'text',
        coutTotal: 'text',
        dateLivraison: 'text',
        statutCommande: 'text',
    },
    { name: 'searchIndex' }
);

const Commande = mongoose.model("Commandes", commandeSchema);

export default Commande;