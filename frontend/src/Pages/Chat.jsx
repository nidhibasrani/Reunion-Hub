import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from '../axios';
import { io } from 'socket.io-client'

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [selectedChatMessages, setSelectedChatMessages] = useState([]);
    const [messageInput, setMessageInput] = useState([]);
    const user = useSelector(state => state.auth.user);
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [messages, setMessages] = useState([]);
    const socket = useMemo(() => io('http://localhost:5000'), []);
    const userId = user?._id;
    const chatWindowRef = useRef(null);

    useEffect(() => {
        // Check if there is a selected conversation ID stored in localStorage
        fetchChats()
        const storedConversationId = localStorage.getItem('selectedConversationId');
        if (storedConversationId) {
            setSelectedConversationId(storedConversationId);
            fetchMessagesForConversation(storedConversationId);
        } else {
            fetchChats();
        }
    }, [messages]);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [selectedChatMessages]);

    const fetchChats = async () => {
        try {
            const response = await axios.get(`chat/conversations/${user?._id}`);
            setChats(response.data);
            console.log('chats', response.data);
        } catch (error) {
            console.log(error);
        }
    };



    const fetchMessagesForConversation = async (conversationId) => {
        try {
            const response = await axios.get(`chat/conversation/${conversationId}/messages`);
            setSelectedChatMessages(response.data);
            console.log('chat messages fetched after receiving the message');
        } catch (error) {
            console.log(error);
        }
    };

    const handleChatClick = (conversationId) => {
        // Store the selected conversation ID in localStorage
        localStorage.setItem('selectedConversationId', conversationId);
        setSelectedConversationId(conversationId);
        fetchMessagesForConversation(conversationId);
    };

    const sendMessage = async () => {
        try {
            const selectedConversation = chats.find(chat => chat._id === selectedConversationId);
            const lastMessage = selectedConversation?.messages[selectedConversation.messages.length - 1];
            const userId = user?._id;

            let sender, receiver;

            // If there's no last message, determine sender and receiver from conversation details
            // console.log("scsSender", selectedConversation.sender._id, "scReceiver", selectedConversation.receiver._id, "userId", userId);

            if (!lastMessage) {
                if (selectedConversation.sender._id === userId) {
                    sender = selectedConversation.sender._id;
                    receiver = selectedConversation.receiver._id;
                } else if (selectedConversation.receiver._id === userId) {
                    sender = selectedConversation.receiver._id;
                    receiver = selectedConversation.sender._id;
                } else {
                    console.log("Neither sender nor receiver match user._id.");
                    return;
                }
            } else {
                // If there is a last message, use its sender and receiver
                sender = lastMessage.sender._id;
                receiver = lastMessage.receiver;

            }
            // console.log('else sender', sender, 'else receiver', receiver);
            let receiverId;
            if (sender === userId) {
                receiverId = receiver;
            } else if (receiver === userId) {
                receiverId = sender;
            } else {
                console.log("Neither sender nor receiver match user._id.");
                return;
            }

            if (receiverId !== userId) {
                socket.emit('send_message', {
                    userId: receiverId,
                    message: messageInput
                });





                const response = await axios.post(`chat/conversation/${selectedConversationId}/message`, {
                    receiver: receiverId,
                    content: messageInput
                });




                setSelectedChatMessages(prevMessages => [...prevMessages, response.data]);

                setMessageInput('');


            } else {
                console.log("Invalid recipient's user ID or sender is the same as the receiver");
            }
        } catch (error) {
            console.log(error);
        }
    };






    useEffect(() => {
        socket.on('connect', () => {
            console.log("connected", socket.id);
            socket.emit('authenticate', user?._id);
        });


        const receivedMessageHandler = (data) => {
            setMessages((messages) => [...messages, data]);
            fetchChats()
            fetchMessagesForConversation(selectedConversationId);

        };

        socket.on('received-message', receivedMessageHandler);


        return () => {

            socket.off('received-message', receivedMessageHandler);
        };
    }, [user, socket]);

    return (
        <div className="flex h-screen">
            <div className="w-1/4 bg-gray-200 p-4 overflow-y-auto">
                <div className="mb-4">
                    <h2 className="text-lg font-bold mb-2">Chats</h2>
                    <ul>
                        {chats.map((chat) => (
                            <li key={chat._id} className="py-2 px-4 bg-gray-300 rounded-lg mb-2" onClick={() => handleChatClick(chat._id)}>
                                {chat.sender._id === user._id ? chat.receiver.userName : chat.sender.userName}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="flex-1 bg-gray-100 p-4">
                <h2 className="text-lg font-bold mb-2">Chat with User</h2>
                <div  ref={chatWindowRef}  className="bg-white p-4 rounded-lg shadow-md overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
                    {selectedChatMessages.map((message) => (
                        <div key={message._id} className={`mb-2 ${message.sender === user._id ? 'flex justify-end' : 'flex justify-start'}`}>
                            <div  className={`p-2 rounded-lg max-w-xs ${message.sender === user._id ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
                                {message.content}
                               
                            </div>
                        </div>
                    ))}

                    {/* {messages.map((m, i) => {
                        const isCurrentUserSender = m.sender === user?._id || m.receiver === user?._id;
                        const senderReceiverClass = isCurrentUserSender ? 'flex justify-end' : 'flex justify-start';
                        const messageBgColorClass = isCurrentUserSender ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';

                        return (
                            <div key={i} className={`mb-2 ${senderReceiverClass}`}>
                                <div className={`p-2 rounded-lg max-w-xs ${messageBgColorClass}`}>
                                    {m}
                                </div>
                            </div>
                        );
                    })} */}




                </div>

                {selectedConversationId ? ( <> <div className="mt-4 flex">
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        className="w-full border rounded-lg px-4 py-2 mr-2"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendMessage();
                            }
                        }}
                    />
                    <button
                        className="bg-blue-500 text-white rounded-lg px-4 py-2"
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div> </>) : ( <> Click on the User to Start Messaging.</>)}
               
            </div>
        </div>
    );
};

export default Chat;
