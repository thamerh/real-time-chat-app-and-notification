import generateToken from "./generateToken.js";
import User from "../models/userModel.js";

//@description     Register new user
//@access          Public
export const RegisterUser =  async (req, res) => {
    const {name,email,password,pic }=req.body;
  
    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("user already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
      pic,
    });
  
    if (user) {
      res.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user.id,user.name,user.email),
      });
    } else {
      res.status(400);
      throw new Error("user not found");
    }
  };
