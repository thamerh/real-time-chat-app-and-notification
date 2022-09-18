
import chat from "../models/chatModel.js";
import User from "../models/userModel.js";


//@description     Create or fetch One to One Chat
//@route           POST /chat
//@access          Protected
export const CreateChat = async (req, res) => {
    const { userId } = req.body;
  
    if (!userId) {
      console.log("UserId param not sent with request");
      return res.sendStatus(400);
    }
  
    var isChat = await chat.find({
      isGroupChat: false,
      $and: [
        { users: { $elemMatch: { $eq: req.user} } },// req.user => user id imported in Authorization feature (decode token)
        { users: { $elemMatch: { $eq: userId } } },
      ],
    })
      .populate("users", "-password")
      .populate("latestMessage");
  
    isChat = await User.populate(isChat, {
      path: "latestMessage.sender",
      select: "name pic email",
    });
  
    if (isChat.length > 0) {
      res.send(isChat[0]);
    } else {
      var chatData = {
        chatName: "sender",
        isGroupChat: false,
        users: [req.user, userId],
      };
  
      try {
        const createdChat = await chat.create(chatData);
        const FullChat = await chat.findOne({ _id: createdChat._id }).populate(
          "users",
          "-password"
        );
        res.status(200).json(FullChat);
      } catch (error) {
        res.status(400);
        throw new Error(error.message);
      }
    }
  };

//@description     Fetch all chats for a user
//@route           GET /chat
//@access          Protected
export const GetChats = async (req, res) => {
    try {
      chat.find({ users: { $elemMatch: { $eq: req.user } } })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400).json(`error: ${error.message}`);
    //   throw new Error(error.message);
    }
  };

//@description     Create New Group Chat
//@route           POST /chat/group
//@access          Protected
export const createGroupChat = async (req, res) => {
    const admin = await User.findOne({_id:req.user});
    console.log(admin)

    if (!req.body.users || !req.body.name) {
      return res.status(400).send({ message: "Please Fill all the feilds" });
    }
  
    var users = JSON.parse(req.body.users);
  
    if (users.length < 2) {
      return res
        .status(400)
        .send("More than 2 users are required to form a group chat");
    }
    
     users.push(admin);
  
    try {
       
      const groupChat = await chat.create({
        chatName: req.body.name,
        users: users,
        isGroupChat: true,
        groupAdmin: admin,
      });
  
      const fullGroupChat = await chat.findOne({ _id: groupChat._id })
        .populate("users", "-password")
        .populate("groupAdmin", "-password");
  
      res.status(200).json(fullGroupChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  };
  