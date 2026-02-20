import { createContext, useContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000");

export const MessageContext = createContext();

export function MessageProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.id) {
      socket.emit("join", user.id);
    }

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("onlineUsers", (users) => {
      setOnlineUsers(users);
    });

    socket.on("typing", () => {
      setIsTyping(true);
      setTimeout(() => setIsTyping(false), 2000);
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("onlineUsers");
      socket.off("typing");
    };
  }, []);

  const fetchConversations = async () => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/messages/conversations/all`||"http://localhost:5000/api/messages/conversations/all",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setConversations(data);
  };

  const fetchMessages = async (receiverId) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/messages/${receiverId}`||`http://localhost:5000/api/messages/${receiverId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await res.json();
    setMessages(data);
  };

  const sendMessage = async (receiverId, text) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`||"http://localhost:5000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ receiverId, text }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, data]);

    socket.emit("sendMessage", data);
  };

  const sendTyping = (receiverId) => {
    socket.emit("typing", { receiverId });
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        conversations,
        onlineUsers,
        isTyping,
        fetchMessages,
        sendMessage,
        fetchConversations,
        sendTyping,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export function useMessages() {
  return useContext(MessageContext);
}