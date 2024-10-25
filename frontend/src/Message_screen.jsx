import React from "react";

function MessageScreen({ messages, currentUserId }) {
  return (
    <div className="chat-messages">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`message ${
            msg.author === "Me" ? "my-message" : "contact-message"
          }`}
          style={{
            backgroundColor:
              msg.author === currentUserId ? "#d1e7dd" : "#f8d7da",
            color: msg.author === currentUserId ? "#0f5132" : "#721c24",
          }}
        >
          <p>{msg.text}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageScreen;
