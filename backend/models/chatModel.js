import mongoose from "mongoose";

const chatModel= mongoose.Schema({
    chatName:{ type: String ,trim:true},
    isGroupeChat:{ type:Boolean ,default:false},
    user:[
        {
          type:  mongoose.Schema.Types.ObjectId,
          ref: "user",

        },
    ],
    latesMessages:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"Message",
    },
    groupAdmin:{
        type:  mongoose.Schema.Types.ObjectId,
        ref:"user",
    }
},
{
    timestamps: true,
});
const chat= mongoose.model("chat",chatModel);
export default chat;