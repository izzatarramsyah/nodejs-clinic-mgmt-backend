import mongoose from 'mongoose';

export default mongoose.model('balance', {
    username : String,
    balance : Number
}, 'balance');