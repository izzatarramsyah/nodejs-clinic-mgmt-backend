import mongoose from 'mongoose';

export default mongoose.model('Patient', {
    fullname : String,
    gender : String,
    birthDate : String,
    nik : String,
    bpjs : String,
    refresh_token : String
}, 'Patient');