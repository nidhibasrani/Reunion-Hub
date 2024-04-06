const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');
const auth = require('../middleware/auth');

router.post('/conversation', auth, async (req, res) => {
    const { receiver } = req.body;
    const { userId } = req.user; 

    try {
        const conversation = new Conversation({ sender: userId, receiver, messages: [] });
        await conversation.save();
       
        res.status(201).json(conversation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/conversation/:conversationId/message', auth, async (req, res) => {
    const { conversationId } = req.params;
    const { userId } = req.user; 
    const { receiver, content } = req.body;

    try {
        const message = new Message({ sender: userId, receiver, content });
        await message.save();

        await Conversation.findByIdAndUpdate(conversationId, {
            $push: { messages: message._id }
        });

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/conversations/:userId', auth, async (req, res) => {
    const { userId } = req.user;
    try {
        const conversations = await Conversation.find({ $or: [{ sender: userId }, { receiver: userId }] })
            .populate('sender', 'userName')
            .populate('receiver', 'userName')
            .populate({
                path: 'messages',
                populate: { path: 'sender', select: 'userName' }
            });
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/conversation/:conversationId/messages', async (req, res) => {
    const { conversationId } = req.params;
    try {
        const conversation = await Conversation.findById(conversationId).populate('messages').sort('creat');
        if (!conversation) {
            return res.status(404).json({ message: 'Conversation not found' });
        }
        res.json(conversation.messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
