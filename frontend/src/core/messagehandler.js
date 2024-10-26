export const handleSendMessage = (text, sendMessageRef, setMessages) => {
  const newMessage = { text, sender: "Me" };
  setMessages((prevMessages) => [...prevMessages, newMessage]);
  if (sendMessageRef.current) {
    sendMessageRef.current(text);
  }
};

export const handleReceiveMessage = (message, setMessages) => {
  const newMessage = { text: message, sender: "Other" };
  setMessages((prevMessages) => [...prevMessages, newMessage]);
};
