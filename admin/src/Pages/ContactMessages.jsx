import React, { useEffect, useState } from "react";
import axios from "../axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

const ContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMessage, setSelectedMessage] = useState(null);

  const getMessages = async () => {
    try {
      const res = await axios.get("/admin/contact-messages");
      if (res.status === 200) {
        setMessages(res.data);
        console.log(res.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  const MessageList = () => {
    return (
      <table className="w-full border-collapse border border-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Message</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message, index) => (
            <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="p-3">{message.name}</td>
              <td className="p-3">{message.email}</td>
           
              <td className="p-3">
                <Button onClick={() => onOpenMessageModal(message)}>Open</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

  const onOpenMessageModal = (message) => {
    setSelectedMessage(message);
    onOpen();
  };

  const ModalContentComponent = () => {
    return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Message Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{selectedMessage && selectedMessage.message}</p>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  return (
    <>
      <h1>Contact Messages</h1>
      <MessageList />
      <ModalContentComponent />
    </>
  );
};

export default ContactMessages;
