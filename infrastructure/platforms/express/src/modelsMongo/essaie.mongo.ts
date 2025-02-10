import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const essaiSchema = new mongoose.Schema(
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
        }
      },
      required: true,
    },
    conducteur: {
      type: {
        _id: {
          type: String,
          default: uuidv4,
          required: true,
        }
      },
      required: true,
    },
    dateDebut: {
      type: Date,
      required: true,
    },
    dateFin: {
      type: Date,
      required: true,
    },
    duree: {
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
    },
  },
  {
    collection: "Essais"
  }
);

essaiSchema.index(
  {
    moto: "text",
    conducteur: "text",
    dateDebut: "text",
    dateFin: "text",
    duree: "text",
  },
  { name: "searchIndex" }
);

const Essai = mongoose.model("Essais", essaiSchema);

export default Essai;
