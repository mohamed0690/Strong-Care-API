import mongoose from "mongoose";
export const locationSchema = new mongoose.Schema({
  latitude: { type: String, required: true },
  longitude: { type: String, required: true },
});
