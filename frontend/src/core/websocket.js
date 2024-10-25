import { useEffect, useRef } from "react";
import { ADDRESS } from "./api";

const WebsocketComponent = ({ roomName }) => {
  const ws = useRef(null);

  useEffect(() => {
    // Close the existing WebSocket if it's already open
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.close();
    }

    const connectWebSocket = () => {
      ws.current = new WebSocket(`ws://${ADDRESS}/ws/chat/${roomName}/`);

      ws.current.onopen = () => {
        console.log("WebSocket connection established for room:", roomName);
      };

      ws.current.onmessage = (event) => {
        console.log("Message received:", event.data);
      };

      ws.current.onerror = (error) => {
        console.error("WebSocket error observed:", error);
      };

      ws.current.onclose = (e) => {
        console.log("WebSocket connection closed:", e.code, e.reason);
        if (e.code === 1006) {
          console.error(
            "WebSocket closed abnormally: Connection was interrupted or server-side issue."
          );
        }
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
        console.log(`Closed WebSocket for room: ${roomName}`);
      }
    };
  }, [roomName]);

  return null;
};

export default WebsocketComponent;
