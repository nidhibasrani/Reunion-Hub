const express = require('express');
const router = express.Router();
const Conversation = require('../models/Conversation');
const Message = require('../models/Message');


router.post('/conversation', async (req, res) => {
    const { sender, receiver } = req.body;
    try {
        const conversation = new Conversation({ sender, receiver, messages: [] });
        await conversation.save();
        res.status(201).json(conversation);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


router.post('/conversation/:conversationId/message', async (req, res) => {
    const { conversationId } = req.params;
    const { sender, receiver, content } = req.body;
    try {
        const message = new Message({ sender, receiver, content });
        await message.save();

     
        await Conversation.findByIdAndUpdate(conversationId, {
            $push: { messages: message._id }
        });

        res.status(201).json(message);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
