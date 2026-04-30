"use client";

import {
  useState,
  useEffect,
  useRef,
  FormEvent,
  KeyboardEvent,
  useCallback,
} from "react";
import Link from "next/link";
import Header from "@/components/Header";
import ChatBubble, {
  Message,
  TypingIndicator,
} from "@/components/ChatBubble";
import { getAIResponse } from "@/lib/ai-mock";

const WELCOME: Message = {
  id: "welcome",
  role: "ai",
  content: "",
  timestamp: new Date(),
  aiData: {
    category: "general",
    emoji: "👋",
    title: "¡Hola! Soy ConectaVida AI",
    intro:
      "Estoy aquí para ayudarte con lo que necesites en tu vida diaria. Puedo orientarte en:",
    steps: [
      "🏥 Salud — síntomas, EPS, orientación médica",
      "📍 Ubicación — rutas, transporte público, cómo llegar",
      "📋 Trámites — cédula, documentos, portales del gobierno",
      "🚨 Emergencias — respuesta rápida y números de auxilio",
      "🎓 Educación — SENA, becas, cursos gratuitos",
    ],
  },
};

const QUICK_REPLIES = [
  { label: "🤒 Me siento mal", msg: "Me siento mal" },
  { label: "📍 Estoy perdido", msg: "Estoy perdido" },
  { label: "🚨 Ayuda urgente", msg: "Necesito ayuda urgente" },
  { label: "📋 Un trámite", msg: "No entiendo un trámite" },
  { label: "🎓 Quiero estudiar", msg: "Quiero estudiar" },
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    const delay = 900 + Math.random() * 600;
    await new Promise((r) => setTimeout(r, delay));

    const aiData = getAIResponse(trimmed);
    const aiMsg: Message = {
      id: `a-${Date.now()}`,
      role: "ai",
      content: "",
      timestamp: new Date(),
      aiData,
    };

    setIsTyping(false);
    setMessages((prev) => [...prev, aiMsg]);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Pick up any message forwarded from the landing page
  useEffect(() => {
    const initial = sessionStorage.getItem("cv-initial-message");
    if (initial) {
      sessionStorage.removeItem("cv-initial-message");
      sendMessage(initial);
    }
  }, [sendMessage]);

  // Auto-scroll on new messages / typing indicator
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <>
      <Header />

      <main
        id="main-content"
        className="flex-1 flex flex-col max-w-3xl w-full mx-auto px-0 sm:px-4 py-0 sm:py-4"
      >
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 sm:rounded-2xl sm:border border-gray-100 dark:border-gray-800 sm:shadow-sm overflow-hidden min-h-0">
          {/* Chat header bar */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
            <Link
              href="/"
              className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Volver al inicio"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>

            <div
              className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-sm shrink-0"
              aria-hidden="true"
            >
              <span className="text-white text-xs font-bold">CV</span>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-gray-900 dark:text-white text-sm">
                ConectaVida AI
              </h1>
              <div className="flex items-center gap-1">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"
                  aria-hidden="true"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  En línea · Responde al instante
                </p>
              </div>
            </div>

            <a
              href="tel:123"
              className="shrink-0 flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-colors"
              aria-label="Llamar a emergencias 123"
            >
              🚨 123
            </a>
          </div>

          {/* Messages area */}
          <div
            className="flex-1 overflow-y-auto p-4 chat-messages"
            role="log"
            aria-live="polite"
            aria-label="Conversación con ConectaVida AI"
          >
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 py-2 border-t border-gray-50 dark:border-gray-800 shrink-0 overflow-x-auto">
            <div
              className="flex gap-2 pb-1"
              role="group"
              aria-label="Respuestas rápidas"
            >
              {QUICK_REPLIES.map((qr, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(qr.msg)}
                  disabled={isTyping}
                  className="shrink-0 text-xs font-medium bg-gray-100 dark:bg-gray-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 text-gray-600 dark:text-gray-300 hover:text-emerald-700 dark:hover:text-emerald-400 px-3 py-1.5 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={`Enviar: ${qr.msg}`}
                >
                  {qr.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input area */}
          <div className="px-4 py-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2"
              aria-label="Formulario de mensaje"
            >
              {/* Mic button (placeholder) */}
              <button
                type="button"
                disabled
                className="p-2.5 text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Entrada de voz (próximamente)"
                title="Entrada de voz (próximamente)"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
              </button>

              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-400 px-4 py-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-emerald-500/40 transition-all disabled:opacity-60"
                aria-label="Escribe tu mensaje para ConectaVida AI"
                disabled={isTyping}
                maxLength={500}
              />

              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="p-2.5 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 dark:disabled:bg-gray-700 text-white rounded-xl transition-all active:scale-95 disabled:cursor-not-allowed"
                aria-label="Enviar mensaje"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>

            <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-center">
              ConectaVida AI orienta, no reemplaza servicios médicos o de
              emergencia profesionales.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
