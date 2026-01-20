import mongoose, { Schema, Document } from "mongoose";

export interface IJob extends Document {
  title: string;
  department: string;
  location: string;
  type: string; // Full-time, Part-time, Contract, Internship
  description: string;
  requirements: string[];
  isActive: boolean;
  createdAt: Date;
}

const JobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  type: { type: String, required: true },
  description: { type: String, required: true },
  requirements: [{ type: String }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Job || mongoose.model<IJob>("Job", JobSchema);
