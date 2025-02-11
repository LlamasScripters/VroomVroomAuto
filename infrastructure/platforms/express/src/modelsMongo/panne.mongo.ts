import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const panneSchema = new mongoose.Schema(
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
          default: uuidv4,
          required: true,
        },
      },
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    actionCorrective: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      required: true,
      default: "à traiter",
      enum: ["à traiter", "en cours de traitement", "traitée"],
    },
    user: {
      type: {
        _id: {
          type: String,
          default: uuidv4,
          required: true,
        },
      },
      required: true,
    },
  },
  {
    collection: "Pannes",
  }
);

panneSchema.index(
  {
    moto: "text",
    description: "text",
    date: "text",
    actionCorrective: "text",
    status: "text",
  },
  {
    name: "searchIndex",
  }
);

const Panne = mongoose.model("Pannes", panneSchema);

export default Panne;
