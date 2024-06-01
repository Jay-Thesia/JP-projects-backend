import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: { type: String, default: 'anonymous' },
    password: { type: String, unique:true,required:true },
    email: { type: String,unique:true,required:true },
    phoneNumber: { type: String },
},{timestamps:true});

const Auth = mongoose.model('Auth', authSchema);

export default Auth