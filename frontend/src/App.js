import Header from "./Header.jsx";
import ContentTable from "./Content.jsx";
import Chat from "./Chat.jsx";
// import Bob from "./assets/bob.jpeg";
import { useState } from "react";
function App() {
  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogout = () => {
    alert("Logging out...");
  };
  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };
  return (
    <>
      <Header onlogout={handleLogout} />
      <div className="app-container">
        <ContentTable onSelectChat={handleChatSelect} />
        {selectedChat && <Chat contact={selectedChat} />}
      </div>
    </>
  );
}

export default App;
