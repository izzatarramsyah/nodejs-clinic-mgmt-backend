import mongoose from 'mongoose';

export default mongoose.model('patient', {
    fullname : String,
    gender : String,
    birthDate : String,
    nik : String,
    bpjs : String,
    email: String,
    phoneNo: String
}, 'patient');