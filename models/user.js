import mongoose from 'mongoose';

export default mongoose.model('users', {
    username : String,
    password : String,
    email : String,
    menuId : String,
    role : String,
    refresh_token : String
}, 'users');