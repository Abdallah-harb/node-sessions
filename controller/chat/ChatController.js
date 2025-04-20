const {join} = require('path')
const { io } = require('../../index');
const Conversation = require('../../model/ConversationModel');
const Message = require('../../model/MessageModel');
const {Auth} = require("../../Services/AuthServices");


// test with html socket
// exports.index =  (req,res)=>{
//     return  res.sendFile(join(__dirname, '..','..','view','index.html'));
// }


// get all conversations
exports.allConversations =async (req,res)=>{
    const authUser = await Auth(req);
    const options = {
        page: req.query.page || 1,
        limit: req.query.limit || 10,
    };
    const conversations = await Conversation.paginate({
                                $or: [
                                    { sender_id: authUser._id },
                                    { receiver_id: authUser._id }
                                ]
                            }, options);

    return res.status(200).json({
        status: 200,
        message: "all conversations",
        data: conversations.docs,
        pagination: {
            total: conversations.totalDocs,
            page: conversations.page,
            pages: conversations.totalPages,
            limit: conversations.limit
        }
    });
}


// start conversation
exports.startConversation =async (req,res)=>{
    try {
        const { receiver_id,message } = req.body;
        const authUser = await Auth(req);


        // Check if conversation already exists
        let conversation = await Conversation.findOne({
            $or: [
                { sender_id: authUser._id, receiver_id: receiver_id },
                { sender_id: receiver_id, receiver_id: authUser._id }
            ]
        });

        if (!conversation) {
            conversation = await Conversation.create({
                sender_id: authUser._id,
                receiver_id: receiver_id,
                last_message: message
            });
        } else {
            conversation.last_message = message;
            await conversation.save();
        }

        // Create new message
        const newMessage = await Message.create({
            conversation_id: conversation._id,
            sender_id: authUser._id,
            receiver_id: receiver_id,
            message: message
        });

        //  Fire real-time event to the receiver
        global._io.to(receiver_id.toString()).emit("new-message", {
            conversation_id: conversation._id,
            message: newMessage
        });

        return res.status(200).json({
            status: 200,
            message: "Conversation started successfully",
            data: {
                conversation,
                newMessage
            }
        });
    }catch (e) {
        return res.status(500).json({
            status:500,
            errors:e.message,
        })
    }

}


// send messages
exports.sendMessage = (req,res)=>{

}
