import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
   userId: { type: String, required: true},
   deviceId: { type: String, required: true, unique: true }, 
   sensors: Array,
   date: Date,
});

const Settings = mongoose.models.Settings || mongoose.model('Settings', settingsSchema);

export default Settings;