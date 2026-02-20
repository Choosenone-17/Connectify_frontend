import { useEffect, useState, useRef } from "react";
import Layout from "../components/Layout";
import { useLocation } from "react-router-dom";

export default function Messages() {
  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();

  const [conversations, setConversations] = useState([]);
  const [selectedUser, setSelectedUser] = useState(
    location.state?.selectedUser || null
  );
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const messagesEndRef = useRef(null);

  /* ===============================
     AUTO SCROLL
  =============================== */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ===============================
     LOAD CONVERSATIONS
  =============================== */
  useEffect(() => {
    if (!user?.id) return;

    fetch(`http://localhost:5000/api/messages/conversations/${user.id}`||`${import.meta.env.VITE_API_URL}/messages/conversations/${user.id}`)
      .then(res => res.json())
      .then(data => {
        console.log("CONVERSATIONS:", data);
        setConversations(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, [user]);

  /* ===============================
     LOAD MESSAGES
  =============================== */
  useEffect(() => {
    if (!selectedUser?.id || !user?.id) return;

    fetch(
      `http://localhost:5000/api/messages/conversation/${user.id}/${selectedUser.id}`||`${import.meta.env.VITE_API_URL}/messages/conversation/${user.id}/${selectedUser.id}`
    )
      .then(res => res.json())
      .then(data => {
        console.log("MESSAGES:", data);
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch(err => console.error(err));
  }, [selectedUser, user]);

  /* ===============================
     SEND MESSAGE
  =============================== */
  const handleSend = async () => {
    if (!newMessage.trim()) return;
    if (!selectedUser?.id) return;

    const res = await fetch(`${import.meta.env.VITE_API_URL}/messages`||"http://localhost:5000/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        senderId: user.id,
        receiverId: selectedUser.id,
        text: newMessage
      })
    });

    const data = await res.json();

    if (res.ok) {
      setMessages(prev => [...prev, data]);
      setNewMessage("");
    }
  };

  return (
    <Layout>
      <div className="flex h-[80vh] bg-white/10 rounded-xl overflow-hidden">

        {/* LEFT SIDE */}
        <div className="w-1/3 border-r border-white/20 p-4">
          <h2 className="text-white font-bold mb-4">Inbox</h2>

          {Array.isArray(conversations) &&
            conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedUser(conv)}
                className={`p-3 rounded cursor-pointer mb-2 transition ${
                  selectedUser?.id === conv.id
                    ? "bg-white/20"
                    : "hover:bg-white/10"
                }`}
              >
                <p className="text-white">{conv.name}</p>
              </div>
            ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex-1 flex flex-col p-4">
          {selectedUser ? (
            <>
              <h2 className="text-white font-bold mb-4">
                Chat with {selectedUser.name}
              </h2>

              <div className="flex-1 overflow-y-auto space-y-3 mb-4 flex flex-col">
                {Array.isArray(messages) &&
                  messages.map((msg, index) => {
                    const isMe =
                      msg.sender === user.id ||
                      msg.sender?.id === user.id;

                    return (
                      <div
                        key={index}
                        className={`flex ${
                          isMe ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`px-4 py-2 rounded-2xl max-w-xs text-sm shadow ${
                            isMe
                              ? "bg-green-500 text-white"
                              : "bg-gray-300 text-black"
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    );
                  })}

                <div ref={messagesEndRef} />
              </div>

              <div className="flex gap-2">
                <input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSend();
                  }}
                  className="flex-1 p-3 rounded-lg bg-white/20 text-white outline-none placeholder-white"
                  placeholder="Type a message..."
                />

                <button
                  onClick={handleSend}
                  className="bg-green-500 hover:bg-green-600 text-white px-5 rounded-lg transition"
                >
                  Send
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-white">
              Select a conversation
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}