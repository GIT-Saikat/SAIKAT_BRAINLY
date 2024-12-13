import mongoose, {model,Schema} from "mongoose"

import * as dotenv from 'dotenv';
dotenv.config();
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  throw new Error('MONGO_URI is not defined in the environment variables');
}
mongoose.connect(mongoURI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });




const UserSchema =new Schema({
    username:{type: String, unique:true},
    password:String
})

const ContentSchema =new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:"Tag"}],
    type:String,
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true}
})

const LinkSchema=new Schema({
    hash:String,
    userId:{type:mongoose.Types.ObjectId,ref:"User",required:true,unique:true},
})


export const UserModel=model("User",UserSchema);
export const LinkModel=model("Links",LinkSchema);
export const ContentModel=model("Content",ContentSchema);

