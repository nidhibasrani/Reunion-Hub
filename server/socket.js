const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST']
    }
});

// Store the mapping of user IDs to socket IDs
const userSocketMap = new Map();

io.on('connection', (socket) => {
    console.log('a user connected', socket.id);

    // Handle user authentication and associate socket ID with user ID
    socket.on('authenticate', (userId) => {
        console.log(`User authenticated: ${userId}, Socket ID: ${socket.id}`);
        userSocketMap.set(userId, socket.id);
    });

    socket.on("send_message", ({ userId, message }) => {
        console.log(`Sending message from ${socket.id} to ${userId}: ${message}`);
        const recipientSocketId = userSocketMap.get(userId);
        if (recipientSocketId) {
            io.to(recipientSocketId).emit('received-message', message);
            // console.log(message)
        } else {
            console.log(`User ${userId} not found or offline.`);
        }
    });

    socket.on("disconnect", () => {
        // Remove the user's entry from the userSocketMap upon disconnection
        userSocketMap.forEach((value, key) => {
            if (value === socket.id) {
                userSocketMap.delete(key);
                console.log(`User ${key} disconnected`);
            }
        });
    });
});

module.exports = { app, io, server };
