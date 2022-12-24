import User from "../models/userModel.js";
// image Upload
import multer from 'multer';
import path from "path" ;
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

// //@description     Register new user
// //@route           POST /Register
// //@access          Public

export const Register = async(req, res) => {
    const pic = req.file.path;
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    try {
          if (!name || !email || !password || !pic ) {
      res.json({msg: "Please Enter all the Feilds"});
    }
  
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.json({msg: "user already exists"});
    }
    
   await User.create({
      name,
      email,
      password:hashPassword,
      pic,
    });
        res.json({msg: "Register secessuful"});
    } catch (error) {
        console.log(error);
        return res.status(404).json({msg: error});

    } 
}

// //@description     Authentification user exist
// //@route           POST /Login
// //@access          Public
export const Login = async(req, res) => {
  const { email, password } = req.body;
    try {
       
        const user = await User.findOne({email:email});
        const match = await bcrypt.compare(password,user.password);
        console.log(match)
  console.log(user)
    if (user && match) {
      const userId=user.id;
      const token= jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d"},
        )
        console.log(token)
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: token
      });
    } else {
      res.json(' Invalid Email or Password');
    }
    } catch (error) {
        res.status(404).json({msg:error});
    }
}  
// Upload Image Controller
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

export const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)  
        const extname = fileTypes.test(path.extname(file.originalname))

        if( mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('pic')
  
//@description     Get or Search all users
//@route           GET user?search=
//@access          Public
export const SearchUsers = async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword).find({id: { $ne: req.user} });
  res.send(users);
};