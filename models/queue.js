import mongoose from 'mongoose';

export default mongoose.model('queue', {
    fullname : String,
    poli : String,
    ticketNo : String,
    poli : String,
    sequence : Number,
    status : String,
    createdAt: { type: Date, default: Date.now }
}, 'queue');