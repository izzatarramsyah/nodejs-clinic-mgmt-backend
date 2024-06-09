import mongoose from 'mongoose';

export default mongoose.model('visitHistory', {
    patientName : String,
    bpjsNo : String,
    doctorName : String,
    specialization : String,
    visitingDay : String,
    visitingShift : String,
    complaint : String,
    sequence: Number,
    ticketNo : String,
    status : String,
    createdAt: { type: Date, default: Date.now }
}, 'visitHistory');