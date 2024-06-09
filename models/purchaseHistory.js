import mongoose from 'mongoose';

export default mongoose.model('purchaseHistory', {
    username : String,
    totalBuy : Number,
    listMedicine : [{
        medicineName : String,
        price : Number,
        quantity : Number,
        ttlBuy : Number
    }],
    createdAt: { type: Date, default: Date.now }
}, 'purchaseHistory');