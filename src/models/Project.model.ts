import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    typeOfProject: { type: String },
    companyName: { type: String,required:true },
    companyDescription: { type: String,required:true },
    companyLocation:{type:String},
    constructionArea:{type:Number},
    images: { type: Array,require:true },

},{timestamps:true});

const Auth = mongoose.model('Auth', authSchema);

export default Auth