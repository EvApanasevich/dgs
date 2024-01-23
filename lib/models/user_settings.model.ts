import mongoose from 'mongoose';

const userSettingsSchema = new mongoose.Schema({
   userId: { type: String, required: true},
   language: { type: String, required: true},
   date: Date,
});

const UserSettings = mongoose.models.UserSettings || mongoose.model('UserSettings', userSettingsSchema);

export default UserSettings;