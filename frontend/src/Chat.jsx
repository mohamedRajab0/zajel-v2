import React, { useEffect, useState, useRef } from "react";
import Headerchat from "./Header_chat";
import Messagebar from "./Messagebar";
import MessageScreen from "./Message_screen";
import api from "./core/api";
import WebsocketComponent from "./core/websocket";
import { handleSendMessage, handleReceiveMessage } from "./core/messagehandler"; // Import handlers

function Chat({ contact }) {
  const [messages, setMessages] = useState([]);
  const sendMessageRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      if (contact) {
        try {
          const response = await api({
            method: "GET",
            url: `/api/groupmessages/${contact.id}/`,
          });
          setMessages(response.data);
          console.log("Group number", contact.id);
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      }
    };
    fetchMessages();
  }, [contact]);

  console.log("onMessage type:", typeof handleReceiveMessage);

  return (
    <div className="chatbox">
      <Headerchat contact={contact} />
      <MessageScreen messages={messages} />
      <Messagebar
        onSendMessage={(text) =>
          handleSendMessage(text, sendMessageRef, setMessages)
        }
      />
      <WebsocketComponent
        roomName={contact.name}
        onMessage={(message) => handleReceiveMessage(message, setMessages)}
        onSendMessageRef={sendMessageRef}
      />
    </div>
  );
}

export default Chat;
