import mongoose from "mongoose";

const DBconnect =async()=>{
try {
    const conn= await mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
    });
    console.log(`MongoDB connected seccefuly in port : ${conn.connection.host}`);
} catch (error) {
    console.log(`Error:${error.message}`);
    process.exit();
}
}
export default DBconnect;