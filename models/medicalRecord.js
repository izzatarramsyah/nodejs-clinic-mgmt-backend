import mongoose from 'mongoose';

export default mongoose.model('medicalRecord', {
    doctorName : String,
    patientName : String,
    bpjsNo : String,
    complaint : String,
    diagnose : String,
    consul : String,
    receiptMedicine : String,
    createdAt: { type: Date, default: Date.now }
}, 'medicalRecord');