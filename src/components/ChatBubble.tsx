"use client";

import { AIMessage } from "@/lib/ai-mock";

export interface Message {
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
  aiData?: AIMessage;
}

const categoryColor: Record<string, string> = {
  emergencia: "text-red-500 dark:text-red-400",
  salud: "text-blue-500 dark:text-blue-400",
  ubicacion: "text-emerald-500 dark:text-emerald-400",
  tramites: "text-amber-500 dark:text-amber-400",
  educacion: "text-purple-500 dark:text-purple-400",
  general: "text-emerald-500 dark:text-emerald-400",
};

function AIAvatar() {
  return (
    <div
      className="shrink-0 w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-full flex items-center justify-center shadow-sm"
      aria-hidden="true"
    >
      <span className="text-white text-xs font-bold">CV</span>
    </div>
  );
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("es-CO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";
  const timeStr = formatTime(message.timestamp);

  if (isUser) {
    return (
      <div className="flex justify-end mb-4 animate-slide-right">
        <div className="max-w-[80%] sm:max-w-[70%]">
          <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-sm px-4 py-3 shadow-sm">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
          <p
            className="text-xs text-gray-400 dark:text-gray-500 mt-1 text-right pr-1"
            aria-label={`Enviado a las ${timeStr}`}
          >
            {timeStr}
          </p>
        </div>
      </div>
    );
  }

  const data = message.aiData;

  if (!data) {
    return (
      <div className="flex items-start gap-3 mb-4 animate-slide-left">
        <AIAvatar />
        <div className="max-w-[80%] sm:max-w-[70%] bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {message.content}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 mb-4 animate-slide-left">
      <AIAvatar />
      <div className="max-w-[88%] sm:max-w-[78%]">
        <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-4 shadow-sm">
          {/* Title row */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg" aria-hidden="true">
              {data.emoji}
            </span>
            <h4
              className={`font-semibold text-sm ${categoryColor[data.category] ?? "text-emerald-500"}`}
            >
              {data.title}
            </h4>
          </div>

          {/* Intro */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 leading-relaxed">
            {data.intro}
          </p>

          {/* Steps */}
          <ol className="space-y-2.5 mb-3" aria-label="Pasos de orientación">
            {data.steps.map((step, i) => (
              <li key={i} className="flex gap-2.5 text-sm text-gray-700 dark:text-gray-300">
                <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs font-bold mt-0.5">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          {/* Contacts */}
          {data.contacts && data.contacts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                Contactos de ayuda
              </p>
              <div className="flex flex-wrap gap-2">
                {data.contacts.map((c, i) => (
                  <a
                    key={i}
                    href={`tel:${c.number}`}
                    className="flex items-center gap-1.5 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-medium px-3 py-1.5 rounded-full hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors"
                    aria-label={`Llamar a ${c.label}: ${c.number}`}
                  >
                    📞 {c.label}:{" "}
                    <strong>{c.number}</strong>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {data.links && data.links.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">
                Recursos en línea
              </p>
              <div className="flex flex-col gap-1.5">
                {data.links.map((l, i) => (
                  <a
                    key={i}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 text-xs font-medium hover:underline"
                  >
                    🔗 {l.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <p
          className="text-xs text-gray-400 dark:text-gray-500 mt-1 pl-1"
          aria-label={`Recibido a las ${timeStr}`}
        >
          {timeStr} · ConectaVida AI
        </p>
      </div>
    </div>
  );
}

export function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 mb-4">
      <AIAvatar />
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div
          className="flex gap-1.5 items-center h-5"
          aria-label="ConectaVida AI está escribiendo..."
          role="status"
        >
          <span className="dot" />
          <span className="dot" />
          <span className="dot" />
        </div>
      </div>
    </div>
  );
}
