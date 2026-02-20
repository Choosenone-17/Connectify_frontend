import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const room = "test_room";

  useEffect(() => {
    socket.emit("join_room", room);

    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, []);

  const sendMessage = () => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: "You",
        message: message,
        time: new Date().toLocaleTimeString(),
      };

      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  };

  return (
    <div className="p-10 text-white">
      <h2 className="text-3xl mb-6">Chat Test</h2>

      <div className="h-80 overflow-y-auto bg-black p-4 rounded mb-4">
        {messageList.map((msg, index) => (
          <div key={index} className="mb-2">
            <strong>{msg.author}</strong>: {msg.message}
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 p-2 rounded text-black"
        />
        <button
          onClick={sendMessage}
          className="bg-pink-600 px-4 py-2 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}