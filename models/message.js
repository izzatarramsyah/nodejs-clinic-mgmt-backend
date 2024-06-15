import mongoose from 'mongoose';

export default mongoose.model('message', {
    from: String,
    to: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
}, 'message');