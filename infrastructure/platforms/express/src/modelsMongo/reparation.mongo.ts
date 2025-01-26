import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const reparationSchema = new mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    dateReparation: {
      type: Date,
      required: true,
    },
    actionsCorrectives: {
      type: [String],
      required: true,
    },
    coutReparation: {
      type: Number,
      required: false,
    },
    status: {
      type: String,
      required: true,
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
    collection: "Reparations",
  }
);

reparationSchema.index(
  {
    description: "text",
    actionsCorrectives: "text",
    coutReparation: "text",
    status: "text",
  },
  {
      name: "searchIndex",
  }
);

const Reparation = mongoose.model("Reparations", reparationSchema);

export default Reparation;
