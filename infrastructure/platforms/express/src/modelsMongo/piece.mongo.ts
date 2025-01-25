import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const pieceSchema = new mongoose.Schema(
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
    reference: {
      type: String,
      required: true,
    },
    quantiteEnStock: {
      type: Number,
      required: true,
    },
    seuilCritique: {
      type: Number,
      required: true,
    },
    categorie: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Pieces",
  }
);

pieceSchema.index(
    {
        nom: "text",
        reference: "text",
        categorie: "text",
    },
    {
        name: "searchIndex",
    }
);

const Piece = mongoose.model("Pieces", pieceSchema);

export default Piece;
