import mongoose from 'mongoose';

export default mongoose.model('purchaseHistory', {
    username : String,
    medicineName : String,
    price : Number,
    quantity : Number,
    createdAt: { type: Date, default: Date.now }
}, 'purchaseHistory');