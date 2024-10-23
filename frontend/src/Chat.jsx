import React, { useState, useEffect } from "react";
import Headerchat from "./Header_chat";
import Messagebar from "./Messagebar";
import MessageScreen from "./Message_screen";

function Chat({ contact }) {
  const [messages, setMessages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(
      `ws://127.0.0.1:8000/ws/chat/${contact.group_name}/`
    );

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      console.log("Message received: ", event.data);
      const data = JSON.parse(event.data);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: data.message, sender: "Contact" },
      ]);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed", event);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, [contact]);
  const handleSendMessage = (text) => {
    setMessages([...messages, { text, sender: "Me" }]);
  };

  return (
    <div className="chatbox">
      <Headerchat contact={contact} />
      <MessageScreen messages={messages} />
      <Messagebar onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;
