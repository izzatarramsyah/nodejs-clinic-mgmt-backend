import mongoose from 'mongoose';

export default mongoose.model('inventory', {
    name : String,
    batch : String,
    quantity : String,
    category : String,
    location : String,
    purchaseDt : String,
    createdAt: { type: Date, default: Date.now }
}, 'inventory');