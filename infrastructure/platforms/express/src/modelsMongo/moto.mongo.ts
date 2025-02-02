import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const motoSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    marque: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    kilometrage: {
      type: Number,
      required: true,
    },
    dateMiseEnService: {
      type: Date,
      required: true,
    },
    statut: {
      type: String,
      required: true,
    },
    serialNumber: {
      type: String,
      required: false,
    },
    user: {
      type: {
        _id: {
          type: String,
          default: uuidv4,
          required: true,
        },
      },
      required: false,
    },
  },
  {
    collection: "Motos",
  }
);

motoSchema.index(
    {
        marque: "text",
        model: "text",
        kilometrage: "text",
        dateMiseEnService: "text",
        statut: "text",
        serialNumber: "text",
    },
    { name: "searchIndex" }
);  

const Moto = mongoose.model("Motos", motoSchema);

export default Moto;
