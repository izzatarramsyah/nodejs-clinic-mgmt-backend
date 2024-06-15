import mongoose from 'mongoose';

export default mongoose.model('doctor', {
    fullname : String,
    nip : String,
    specialization : String,
    status: String,
    schedule : [{
        day : String,
        shift : String
    }],
    createdAt: { type: Date, default: Date.now }
}, 'doctor');