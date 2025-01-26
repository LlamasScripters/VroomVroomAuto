import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const entretienSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: uuidv4,
            required: true,
        },
        moto: {
            type: {
                _id: {
                    type: String,
                    required: true,
                },
            },
            required: true,
        },
        typeEntretien: {
            type: String,
            required: true,
        },
        datePrevue: {
            type: Date,
            required: true,
        },
        dateRealisee: {
            type: Date,
            required: true,
        },
        kilometrageEntretien: {
            type: Number,
            required: true,
        },
        recommandationsTechnicient: {
            type: String,
            required: true,
        },
        recommandationsGestionnaireClient: {
            type: String,
            required: true,
        },
        cout: {
            type: Number,
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
    },
    {
        collection: "Entretiens",
    }
);

entretienSchema.index(
    {
        typeEntretien: 'text',
        datePrevue: 'text',
        dateRealisee: 'text',
        kilometrageEntretien: 'text',
        recommandationsTechnicient: 'text',
        recommandationsGestionnaireClient: 'text',
        cout: 'text',
        statut: 'text',
    },
    {name: 'searchIndex'}
);

const Entretien = mongoose.model("Entretiens", entretienSchema);

export default Entretien;