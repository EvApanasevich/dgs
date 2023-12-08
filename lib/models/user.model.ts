import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
   username: { type: String, required: true, unique: true },
   name: { type: String, required: true },
   created: Date,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;