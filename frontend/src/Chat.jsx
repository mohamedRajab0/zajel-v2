import React, { useEffect, useState } from "react";
import Headerchat from "./Header_chat";
import Messagebar from "./Messagebar";
import MessageScreen from "./Message_screen";
import api from "./core/api";

function Chat({ contact }) {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    setMessages([...messages, { text, sender: "Me" }]);
  };

  useEffect(() => {
    const fetchmessages = async () => {
      if (contact) {
        try {
          const response = await api({
            method: "GET",
            url: `/api/groupmessages/${contact.id}/`,
          });
          setMessages(response.data);
          console.log("group number", contact.id);
        } catch (error) {
          console.error("Error fetching messages", error);
        }
      }
    };
    fetchmessages();
  }, [contact]);

  return (
    <div className="chatbox">
      <Headerchat contact={contact} />
      <MessageScreen messages={messages} />
      <Messagebar onSendMessage={handleSendMessage} />
    </div>
  );
}

export default Chat;
