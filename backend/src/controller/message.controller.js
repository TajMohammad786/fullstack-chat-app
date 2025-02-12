import Message from "../model/message.model.js";
export const getUsersForSidebar = async(req, res)=>{
  try{
    const loggedInUser = req.user._id;;

    const filteredUser = await User.find({_id: {$ne: loggedInUser}}).select("-password");

    res.status(200).json({message: "Users fetched successfully", users: filteredUser});
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
  
}

export const getMessages = async(req, res)=>{
  try{
    const {id: userToChatId} = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        {senderId: myId, receiverId: userToChatId},
        {senderId: userToChatId, receiverId: myId}
      ]
    })
    res.status(200).json(messages);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}

export const sendMessages = async(req, res)=>{
  try{
    const { text, image } = req.body;
    const {id: receiverId} = req.params;

    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl
    })
    await newMessage.save();
    // todo real time functionality

    res.status(201).json(newMessage);
  }
  catch(error){
    res.status(500).json({message: error.message});
  }
}