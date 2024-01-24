import mongoose from 'mongoose';

const powerSettingsSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    deviceId: { type: String, required: true, unique: true }, 
    powerSettings: Array,
    date: Date,
});

const PowerSettings = mongoose.models.PowerSettings || mongoose.model('PowerSettings', powerSettingsSchema);

export default PowerSettings;