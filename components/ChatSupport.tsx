"use client";

import { useState, useEffect, useRef } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Mail,
  Phone,
  MessageSquare,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

type ChatStage = "ai" | "contact-options" | "closed";

const STORAGE_KEY = "wisata_chat_history";
const STAGE_KEY = "wisata_chat_stage";

export default function ChatSupport() {
  const [isOpen, setIsOpen] = useState(false);
  const [stage, setStage] = useState<ChatStage>("ai");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Halo! 👋 Saya asisten virtual Wisata Pangandaran. Ada yang bisa saya bantu tentang destinasi wisata, event, atau informasi lainnya?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load chat history from localStorage on mount
  useEffect(() => {
    try {
      const savedMessages = localStorage.getItem(STORAGE_KEY);
      const savedStage = localStorage.getItem(STAGE_KEY);

      if (savedMessages) {
        const parsed = JSON.parse(savedMessages);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }));
        setMessages(messagesWithDates);
      }

      if (savedStage) {
        setStage(savedStage as ChatStage);
      }
    } catch (error) {
      console.error("Error loading chat history:", error);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (error) {
      console.error("Error saving chat history:", error);
    }
  }, [messages]);

  // Save stage to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STAGE_KEY, stage);
    } catch (error) {
      console.error("Error saving chat stage:", error);
    }
  }, [stage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const checkForContactKeywords = (text: string): boolean => {
    const keywords = [
      "admin",
      "manusia",
      "orang",
      "telepon",
      "whatsapp",
      "wa",
      "email",
      "kontak",
      "hubungi",
      "bicara dengan",
      "customer service",
      "cs",
      "komplain",
      "keluhan",
    ];
    return keywords.some((keyword) =>
      text.toLowerCase().includes(keyword.toLowerCase())
    );
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Check if user wants to contact admin
    if (checkForContactKeywords(input)) {
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Saya mengerti Anda ingin berbicara dengan tim kami secara langsung. Silakan pilih cara menghubungi yang Anda inginkan di bawah ini! 👇",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
        setTimeout(() => setStage("contact-options"), 500);
      }, 800);
      return;
    }

    try {
      const response = await fetch("/api/chat-support", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `Kamu adalah asisten virtual untuk website Wisata Pangandaran (https://wisatapangandaran.com). 

TUGAS UTAMA:
- Membantu pengunjung dengan informasi AKURAT berdasarkan data website
- Jawab pertanyaan tentang destinasi wisata, event, berita, UKM lokal
- Berikan rekomendasi berdasarkan preferensi user
- Informasikan harga, lokasi, rating yang TEPAT dari data

GAYA KOMUNIKASI:
- Ramah, informatif, dan profesional
- Gunakan Bahasa Indonesia yang natural
- Jawab SINGKAT dan PADAT (maksimal 3-4 kalimat)
- Gunakan emoji secukupnya untuk friendly tone
- Jika diminta list, tampilkan maksimal 5 item

DATA YANG KAMU PUNYA:
- Destinasi wisata lengkap dengan harga, lokasi, rating, kategori
- Event & agenda dengan tanggal dan lokasi
- Berita terbaru tentang Pangandaran
- UKM lokal (kuliner, kerajinan, jasa wisata)

KETIKA USER BERTANYA:
- "destinasi apa saja?" → List destinasi dari data dengan detail singkat
- "event apa saja?" → List event upcoming dengan tanggal
- "harga tiket X?" → Berikan harga SPESIFIK dari data
- "rekomendasi pantai" → Filter dan rekomendasikan destinasi kategori PANTAI
- "kuliner/UKM" → Sebutkan nama dan lokasi dari data

JIKA TIDAK ADA DATA:
- Jujur katakan informasi tidak tersedia di database
- Sarankan hubungi admin untuk info lebih lanjut
- JANGAN membuat-buat data!

REDIRECT KE ADMIN:
Jika user butuh:
- Booking/reservasi
- Komplain/masalah
- Informasi yang sangat spesifik
- Berbicara dengan manusia
→ Sarankan "hubungi admin" untuk kontak langsung`,
            },
            ...messages
              .filter((m) => m.role !== "system")
              .map((m) => ({
                role: m.role,
                content: m.content,
              })),
            {
              role: "user",
              content: input,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("Failed to get response");

      const data = await response.json();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);

      // Check if AI suggests contacting admin
      if (
        checkForContactKeywords(data.message) ||
        data.message.toLowerCase().includes("hubungi") ||
        data.message.toLowerCase().includes("kontak")
      ) {
        setTimeout(() => {
          const suggestionMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: "assistant",
            content:
              "Apakah Anda ingin terhubung dengan tim kami secara langsung? Saya bisa mengarahkan Anda ke pilihan kontak. 😊",
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, suggestionMessage]);
        }, 1000);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi admin kami secara langsung.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setTimeout(() => setStage("contact-options"), 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleContactClick = () => {
    setStage("contact-options");
  };

  const resetChat = () => {
    const initialMessages = [
      {
        id: "welcome",
        role: "assistant" as const,
        content:
          "Halo! 👋 Saya asisten virtual Wisata Pangandaran. Ada yang bisa saya bantu tentang destinasi wisata, event, atau informasi lainnya?",
        timestamp: new Date(),
      },
    ];

    setStage("ai");
    setMessages(initialMessages);

    // Clear localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMessages));
      localStorage.setItem(STAGE_KEY, "ai");
    } catch (error) {
      console.error("Error clearing chat history:", error);
    }
  };

  const clearChatHistory = () => {
    if (confirm("Hapus semua riwayat chat?")) {
      resetChat();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-cyan-500 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center group"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
          <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:max-w-md h-[100dvh] sm:h-[600px] sm:rounded-2xl bg-white shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-3 sm:p-4 flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              {stage === "contact-options" && (
                <button
                  onClick={resetChat}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              )}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                {stage === "ai" ? (
                  <Bot className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">
                  {stage === "ai" ? "Asisten Virtual" : "Hubungi Kami"}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/80 flex items-center gap-1">
                  {stage === "ai" ? (
                    <>
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                      Online • Data Real-time
                    </>
                  ) : (
                    "Pilih kontak"
                  )}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {stage === "ai" && messages.length > 1 && (
                <button
                  onClick={clearChatHistory}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors text-xs"
                  title="Hapus riwayat chat"
                >
                  🗑️
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          {stage === "ai" ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 sm:space-y-4 bg-slate-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-start space-x-2",
                      message.role === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    )}
                  >
                    <div
                      className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0",
                        message.role === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-white text-blue-600 border-2 border-blue-200"
                      )}
                    >
                      {message.role === "user" ? (
                        <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      ) : (
                        <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "max-w-[75%] sm:max-w-[80%] rounded-2xl px-3 py-2 sm:px-4 sm:py-2 shadow-sm",
                        message.role === "user"
                          ? "bg-blue-600 text-white rounded-tr-none"
                          : "bg-white text-slate-800 rounded-tl-none"
                      )}
                    >
                      <p className="text-xs sm:text-sm whitespace-pre-wrap break-words">
                        {message.content}
                      </p>
                      <p
                        className={cn(
                          "text-[10px] sm:text-xs mt-1",
                          message.role === "user"
                            ? "text-blue-200"
                            : "text-slate-400"
                        )}
                      >
                        {message.timestamp.toLocaleTimeString("id-ID", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start space-x-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-blue-600 border-2 border-blue-200 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none px-3 py-2 sm:px-4 sm:py-3 shadow-sm">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              <div className="px-3 py-2 sm:px-4 sm:py-2 bg-white border-t border-slate-200">
                <button
                  onClick={handleContactClick}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
                >
                  <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>Hubungi admin langsung</span>
                </button>
              </div>

              {/* Input */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200 pb-safe">
                <div className="flex items-end space-x-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ketik pesan Anda..."
                    className="flex-1 px-3 py-2 sm:px-4 sm:py-3 bg-slate-100 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    disabled={isLoading}
                  />
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="p-2.5 sm:p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Contact Options */
            <div className="flex-1 p-4 sm:p-6 space-y-3 sm:space-y-4 bg-slate-50 overflow-y-auto">
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-2">
                  Pilih Cara Menghubungi
                </h3>
                <p className="text-xs sm:text-sm text-slate-600">
                  Tim kami siap membantu Anda melalui berbagai channel
                </p>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/6281234567890?text=Halo,%20saya%20ingin%20bertanya%20tentang%20wisata%20Pangandaran"
                target="_blank"
                rel="noopener noreferrer"
                className="block p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-green-500 group"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-slate-800">
                      WhatsApp
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 truncate">
                      Chat langsung via WhatsApp
                    </p>
                  </div>
                  <div className="text-slate-400 group-hover:text-green-600 text-lg sm:text-xl">
                    →
                  </div>
                </div>
              </a>

              {/* Email */}
              <a
                href="mailto:info@wisatapangandaran.com?subject=Pertanyaan tentang Wisata Pangandaran"
                className="block p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-blue-500 group"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors flex-shrink-0">
                    <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-slate-800">
                      Email
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 truncate">
                      info@wisatapangandaran.com
                    </p>
                  </div>
                  <div className="text-slate-400 group-hover:text-blue-600 text-lg sm:text-xl">
                    →
                  </div>
                </div>
              </a>

              {/* Telepon */}
              <a
                href="tel:+6281234567890"
                className="block p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all border-2 border-transparent hover:border-purple-500 group"
              >
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center group-hover:bg-purple-500 transition-colors flex-shrink-0">
                    <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 group-hover:text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm sm:text-base text-slate-800">
                      Telepon
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 truncate">
                      +62 812-3456-7890
                    </p>
                  </div>
                  <div className="text-slate-400 group-hover:text-purple-600 text-lg sm:text-xl">
                    →
                  </div>
                </div>
              </a>

              {/* Back to AI Chat */}
              <button
                onClick={resetChat}
                className="w-full mt-4 p-2.5 sm:p-3 bg-slate-200 text-slate-700 rounded-xl hover:bg-slate-300 transition-colors font-medium text-xs sm:text-sm"
              >
                ← Kembali ke Chat AI
              </button>

              {/* Office Info */}
              <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-xl border border-blue-200">
                <h5 className="font-semibold text-sm sm:text-base text-slate-800 mb-2">
                  Jam Operasional
                </h5>
                <p className="text-xs sm:text-sm text-slate-600">
                  Senin - Jumat: 08:00 - 17:00 WIB
                </p>
                <p className="text-xs sm:text-sm text-slate-600">
                  Sabtu - Minggu: 09:00 - 15:00 WIB
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
