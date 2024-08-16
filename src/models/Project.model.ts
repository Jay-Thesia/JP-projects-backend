import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    projectName: { type: String, required: true },
    projectType: { type: String },
    projectDescription: { type: String, required: true },
    projectLocation: { type: String },
    projectConstructionArea: { type: Number },
    projectImages: { type: Array, require: true },
    projectStartDate: { type: Date },
    projectEndDate: { type: Date },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;
