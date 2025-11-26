"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export default function SocketDemo() {
  const [message, setMessage] = useState("");
  const [received, setReceived] = useState<string[]>([]);

  useEffect(() => {
    console.log("📡 Creating socket connection...");

    socket = io({
      path: "/api/socket",   // you MUST match this with server
    });

    socket.on("connect_error", (err) => {
      console.log("❌ Connection error:", err.message);
    });

    socket.on("connect", () => {
      console.log("✅ Connected to socket:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔌 Socket disconnected");
    });

    socket.on("message-from-server", (msg) => {
      console.log("📩 Received from server:", msg);
      setReceived((prev) => [...prev, msg]);
    });

    return () => {
      console.log("🔄 Cleaning socket...");
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    console.log("📤 Sending message:", message);
    socket.emit("send-message", message);
    setMessage("");
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>Socket.io Debug Demo</h1>
    </div>
  );
}
