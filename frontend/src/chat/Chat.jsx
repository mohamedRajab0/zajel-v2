/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Headerchat from "../Header_chat.jsx";
import Messagebar from "../message/Messagebar";
import MessageScreen from "../message/Message_screen";
import { jwtDecode } from "jwt-decode";
import {
  handleSendMessage,
  handleReceiveMessage,
} from "../core/messagehandler"; // Import handlers
import { useWebSocket } from "../core/websocket";
import useAxios from "../utils/useAxios";

function Chat({ contact }) {
  const [messages, setMessages] = useState([]);
  // const sendMessageRef = useRef(null);
  const api = useAxios();
  const authTokens = localStorage.getItem("authTokens");
  const UserId = jwtDecode(authTokens).user_id;
  const { ws, isWsOpen } = useWebSocket();
  useEffect(() => {
    const fetchMessages = async () => {
      if (contact) {
        try {
          const response = await api.get(
            `/chat/api/groupmessages/${contact.id}/`
          );
          setMessages(response.data);
          console.log("Group number", contact.id);
          console.log("response", response.data);
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      }
    };
    fetchMessages();
    // Ensure ws is initialized before setting event handlers
    if (ws) {
      // ws.onopen = () => {
      //   console.log("WebSocket connection established.");
      //   ws.send(JSON.stringify({ action: "subscribe", room: contact.name }));
      // };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log("Received message from server:", message.message);
        if (message) {
          handleReceiveMessage(message, setMessages);
        } else {
          console.warn("Received message without content:", message);
        }
      };

      // ws.onclose = (event) => {
      //   console.log("WebSocket closed", event.code);
      // };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    }

    // return () => {
    //   if (ws && ws.readyState === 1) {
    //     ws.send(JSON.stringify({ action: "unsubscribe", room: contact.name }));
    //     ws.close();
    //   }
    // };
  }, [contact, ws]);
  return (
    <div className="chatbox">
      <Headerchat contact={contact} />
      <MessageScreen messages={messages} currentUser={UserId} />

      <Messagebar
        onSendMessage={(message) => {
          console.log("WebSocket state before sending message:", ws.readyState);
          if (isWsOpen) {
            message = {
              body: message,
              author: UserId,
            };
            handleSendMessage(message, ws);
          } else {
            console.error("WebSocket is not open. Cannot send message.");
          }
        }}
      />
    </div>
  );
}

export default Chat;
