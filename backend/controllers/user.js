import generateToken from "./generateToken.js";
import User from "../models/userModel.js";
// image Upload
import multer from 'multer';
import path from "path" ;

//@description     Register new user
//@route           POST /Register
//@access          Public
export const RegisterUser =  async (req, res) => {
    const pic = req.file.path;
    const name= req.body.name;
    const email= req.body.email;
    const password= req.body.password;
  
    if (!name || !email || !password || !pic ) {
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
//@description     Authentification user exist
//@route           POST /Login
//@access          Public
export const LoginUser = async (req, res) => {
    const { email, password } = req.body;
  
    const user = await User.findOne({ email });
  
    if (user && (await user.matchPassword(password))) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token: generateToken(user.id,user.name,user.email),
      });
    } else {
      res.status(401);
      throw new Error("Invalid Email or Password");
    }
  };
  
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
  