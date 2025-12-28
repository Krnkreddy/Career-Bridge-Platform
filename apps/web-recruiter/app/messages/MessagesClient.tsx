
"use client";

import { useAuth } from "@clerk/nextjs";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { io, Socket } from "socket.io-client";
import { Send, Loader2, ArrowLeft } from "lucide-react";
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Message = {
    id: string;
    content: string;
    senderId: string;
    createdAt: string;
};

type Conversation = {
    id: string;
    host: any;
    participant: any;
    messages: Message[];
};

export default function MessagesClient() {
    const { getToken, userId } = useAuth();
    const searchParams = useSearchParams();
    const convIdParam = searchParams.get('id');

    const [socket, setSocket] = useState<Socket | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConvId, setActiveConvId] = useState<string | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Socket & Fetch Conversations
    useEffect(() => {
        if (!userId) return;

        const init = async () => {
            const token = await getToken();

            try {
                const res = await axios.get("http://localhost:3001/chat/conversations", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setConversations(res.data);
                if (convIdParam) {
                    setActiveConvId(convIdParam);
                } else if (res.data.length > 0) {
                    setActiveConvId(res.data[0].id);
                }
            } catch (err) {
                console.error("Failed to fetch conversations", err);
            } finally {
                setLoading(false);
            }

            const newSocket = io("http://localhost:3001", {
                auth: { token }
            });

            newSocket.on('connect', () => {
                console.log("Connected to Chat Gateway");
            });

            newSocket.on('newMessage', (msg: Message) => {
                setMessages(prev => [...prev, msg]);
                scrollToBottom();
            });

            setSocket(newSocket);
            return () => { newSocket.disconnect(); };
        };

        const cleanup = init();
    }, [userId, convIdParam]);

    // Fetch Messages
    useEffect(() => {
        if (!activeConvId || !userId) return;

        const fetchMessages = async () => {
            const token = await getToken();
            try {
                const res = await axios.get(`http://localhost:3001/chat/conversations/${activeConvId}/messages`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessages(res.data);
                scrollToBottom();
            } catch (err) {
                console.error(err);
            }
        };
        fetchMessages();
    }, [activeConvId, userId]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSend = () => {
        if (!newMessage.trim() || !socket || !activeConvId) return;

        const activeConv = conversations.find(c => c.id === activeConvId);
        if (!activeConv) return;

        const otherUser = activeConv.host.clerkId === userId ? activeConv.participant : activeConv.host;

        const payload = {
            recipientId: otherUser.id,
            content: newMessage
        };

        socket.emit('sendMessage', payload);
        setNewMessage("");
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

    return (
        <div className="flex h-screen bg-slate-50">
            {/* Sidebar List */}
            <div className="w-1/3 bg-white border-r flex flex-col">
                <div className="p-4 border-b flex items-center gap-2">
                    <Link href="/" className="text-slate-500 hover:text-slate-900"><ArrowLeft className="h-5 w-5" /></Link>
                    <span className="font-bold text-lg">Messages</span>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map(c => {
                        const other = c.host.clerkId === userId ? c.participant : c.host;
                        return (
                            <div
                                key={c.id}
                                onClick={() => setActiveConvId(c.id)}
                                className={`p-4 border-b cursor-pointer hover:bg-slate-50 ${activeConvId === c.id ? 'bg-blue-50' : ''}`}
                            >
                                <div className="font-bold text-slate-900">{other.profile?.fullName || "User"}</div>
                                <div className="text-sm text-slate-500 truncate">{c.messages[0]?.content || "Start chatting..."}</div>
                            </div>
                        );
                    })}
                    {conversations.length === 0 && <div className="p-4 text-slate-400">No conversations yet.</div>}
                </div>
            </div>

            {/* Chat Window */}
            <div className="flex-1 flex flex-col">
                {activeConvId ? (
                    <>
                        <div className="p-4 bg-white border-b font-bold text-slate-800 shadow-sm z-10">
                            {(() => {
                                const c = conversations.find(x => x.id === activeConvId);
                                const other = c?.host.clerkId === userId ? c?.participant : c?.host;
                                return other?.profile?.fullName || "Chat";
                            })()}
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((m, i) => {
                                // Match sender logic
                                const c = conversations.find(x => x.id === activeConvId);
                                const amIHost = c?.host.clerkId === userId;
                                const myDbId = amIHost ? c?.host.id : c?.participant.id;
                                const isMe = m.senderId === myDbId;

                                return (
                                    <div key={i} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${isMe ? 'bg-blue-600 text-white rounded-br-none' : 'bg-white border text-slate-800 rounded-bl-none'}`}>
                                            {m.content}
                                        </div>
                                    </div>
                                );
                            })}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t flex gap-2">
                            <input
                                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Type a message..."
                                value={newMessage}
                                onChange={e => setNewMessage(e.target.value)}
                                onKeyDown={e => e.key === 'Enter' && handleSend()}
                            />
                            <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition">
                                <Send className="h-5 w-5" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-slate-400">
                        Select a conversation to start chatting
                    </div>
                )}
            </div>
        </div>
    );
}
