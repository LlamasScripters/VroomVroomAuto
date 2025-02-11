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
        coutMainOeuvre: {
            type: Number,
            required: true,
        },
        coutPieces: {
            type: Number,
            required: true,
        },
        coutTotal: {
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
        "moto._id": 1,
        "typeEntretien": 1,
        "datePrevue": 1,
        "dateRealisee": 1,
        "kilometrageEntretien": 1,
        "recommandationsTechnicient": 1,
        "recommandationsGestionnaireClient": 1,
        "coutMainOeuvre": 1,
        "coutPieces": 1,
        "coutTotal": 1,
        "statut": 1,
        "user._id": 1,
    },
    { name: 'searchIndex' }
);

const Entretien = mongoose.model("Entretiens", entretienSchema);

export default Entretien;