import mongoose from "mongoose";

const backuppowerSettingsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  deviceId: { type: String, required: true, unique: true },
  backuppowerSettings: Array,
  date: Date,
});

const BackuppowerSettings =
  mongoose.models.BackuppowerSettings ||
  mongoose.model("BackuppowerSettings", backuppowerSettingsSchema);

export default BackuppowerSettings;
