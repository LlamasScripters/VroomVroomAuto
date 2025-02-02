import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const incidentSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    essai: {
      type: {
        _id: {
          type: String,
          default: uuidv4,
          required: true,
        },
      },
      required: true,
    },
    typeIncident: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dateIncident: {
      type: Date,
      required: true,
    },
    gravite: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Incidents",
  }
);

incidentSchema.index(
  {
    typeIncident: "text",
    description: "text",
    dateIncident: "text",
    gravite: "text",
  },
  { name: "searchIndex" }
);

const Incident = mongoose.model("Incidents", incidentSchema);

export default Incident;
