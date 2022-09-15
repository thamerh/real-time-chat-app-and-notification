import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
   pic:{type:String, required:true,default:"https://www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png"},
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
},
{
    timestamps: true,
});
const User= mongoose.model("User",UserModel);
export default User;