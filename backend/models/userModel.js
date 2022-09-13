import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
   pic:{type:String, required:true,default:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"},
},
{
    timestamps: true,
});
const user= mongoose.model("user",UserModel);
export default user;