import mongoose from 'mongoose';

export default mongoose.model('doctor', {
    fullname : String,
    nip : String,
    specialization : String,
    status: String,
    visitingTime : [{
        day : String,
        shift : String
    }],
    createdAt: { type: Date, default: Date.now }
}, 'doctor');