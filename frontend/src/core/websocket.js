import { useEffect, useState } from "react";
import { ADDRESS } from "./api";

const WebsocketComponent = ({ roomName }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (roomName && !socket) {
      const url = `ws://${ADDRESS}/ws/chat/${encodeURIComponent(roomName)}/`;
      const newSocket = new WebSocket(url);
      setSocket(newSocket);

      newSocket.onopen = () => {
        console.log("Wesocket connection established", newSocket);
      };

      newSocket.onerror = (event) => {
        console.error("websocket error", event);
      };

      newSocket.onclose = (event) => {
        console.log("Websocket connection closed", event);
      };
      return () => newSocket.close();
    }
  }, [roomName, socket]);
  // return <div>Websocket component for room: {roomName}</div>;
};
export default WebsocketComponent;
