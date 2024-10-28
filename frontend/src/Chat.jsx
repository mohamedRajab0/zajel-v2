import React, { useEffect, useState, useRef } from "react";
import Headerchat from "./Header_chat";
import Messagebar from "./Messagebar";
import MessageScreen from "./Message_screen";
import api from "./core/api";
import { jwtDecode } from "jwt-decode";
import WebsocketComponent from "./core/websocket";
import { handleSendMessage, handleReceiveMessage } from "./core/messagehandler"; // Import handlers

function Chat({ contact }) {
  const [messages, setMessages] = useState([]);
  const sendMessageRef = useRef(null);
  const authTokens = localStorage.getItem("authTokens");
  const UserId = jwtDecode(authTokens).user_id;

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
          console.log("response", response.data);
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
      <MessageScreen messages={messages} currentUser={UserId} />
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
