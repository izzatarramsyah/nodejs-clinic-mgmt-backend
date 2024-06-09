import mongoose from 'mongoose';

export default mongoose.model('medicine', {
    name : String,
    batch : String,
    quantity : String,
    category : String,
    notes : String,
    expired : String,
    price : Number,
    createdAt: { type: Date, default: Date.now }
}, 'medicine');