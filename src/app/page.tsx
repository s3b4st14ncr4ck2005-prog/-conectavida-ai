"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import EmergencyButton from "@/components/EmergencyButton";

const suggestions = [
  { text: "Me siento mal", emoji: "🤒" },
  { text: "Estoy perdido", emoji: "📍" },
  { text: "Necesito ayuda urgente", emoji: "🚨" },
  { text: "No entiendo este trámite", emoji: "📋" },
];

const features = [
  {
    icon: "🏙️",
    title: "Guía en la ciudad",
    description:
      "Rutas de Transmilenio, SITP, Metro y más. Te ayudo a llegar a donde necesites con seguridad.",
    color: "emerald" as const,
  },
  {
    icon: "🏥",
    title: "Ayuda médica",
    description:
      "Orientación sobre síntomas, cómo agendar cita con tu EPS y cuándo ir a urgencias.",
    color: "blue" as const,
  },
  {
    icon: "📋",
    title: "Trámites",
    description:
      "Guía paso a paso para cédula, RUT, apostillas y más de 1.000 trámites del gobierno.",
    color: "amber" as const,
  },
  {
    icon: "🚨",
    title: "Emergencia",
    description:
      "Respuesta inmediata con contactos de emergencias, primeros pasos y recursos de ayuda.",
    color: "red" as const,
  },
  {
    icon: "🤝",
    title: "Conexión con ayuda",
    description:
      "Conecta con fundaciones, centros de apoyo, líneas de ayuda y recursos comunitarios.",
    color: "teal" as const,
  },
  {
    icon: "🎓",
    title: "Asistente educativo",
    description:
      "Becas SENA, ICETEX, cursos gratuitos y orientación para avanzar en tu educación.",
    color: "purple" as const,
  },
];

const howSteps = [
  {
    icon: "💬",
    step: "1",
    title: "Cuéntame tu problema",
    desc: "Escribe en tus propias palabras qué necesitas, sin tecnicismos.",
  },
  {
    icon: "🤖",
    step: "2",
    title: "Recibe orientación clara",
    desc: "ConectaVida AI analiza y te da pasos concretos y útiles.",
  },
  {
    icon: "✅",
    step: "3",
    title: "Actúa con confianza",
    desc: "Con la información correcta, resuelves tu situación más rápido.",
  },
];

export default function HomePage() {
  const [input, setInput] = useState("");
  const router = useRouter();

  const goToChat = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    sessionStorage.setItem("cv-initial-message", trimmed);
    router.push("/chat");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    goToChat(input);
  };

  return (
    <>
      <Header />

      <main id="main-content" className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-16 sm:py-24 px-4">
          <div
            className="absolute inset-0 overflow-hidden pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/30 dark:bg-emerald-900/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-4xl mx-auto text-center">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-4 py-2 rounded-full mb-6 animate-fade-in">
              <span
                className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
                aria-hidden="true"
              />
              Asistente con IA disponible 24/7
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 animate-fade-in-up">
              Tu asistente personal
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">
                con IA para Colombia
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10 animate-fade-in-up delay-200">
              Resuelvo desde trámites hasta emergencias. Solo cuéntame qué
              necesitas y te guío paso a paso.
            </p>

            {/* Main chat input */}
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto animate-fade-in-up delay-300"
            >
              <div className="relative flex items-center bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 rounded-2xl shadow-lg transition-all duration-300">
                <span className="pl-4 text-2xl" aria-hidden="true">
                  💬
                </span>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Cuéntame qué necesitas..."
                  className="flex-1 px-4 py-4 text-base text-gray-900 dark:text-white bg-transparent outline-none placeholder:text-gray-400"
                  aria-label="Escribe tu consulta o problema"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="m-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-200 dark:disabled:bg-gray-700 text-white disabled:text-gray-400 font-semibold px-5 py-3 rounded-xl transition-all duration-200 active:scale-95 disabled:cursor-not-allowed"
                  aria-label="Enviar consulta"
                >
                  Consultar
                </button>
              </div>
            </form>

            {/* Suggestion chips */}
            <div
              className="flex flex-wrap justify-center gap-3 mt-6 animate-fade-in-up delay-400"
              role="group"
              aria-label="Consultas de ejemplo"
            >
              <p className="w-full text-sm text-gray-400 dark:text-gray-500 mb-1">
                Prueba con:
              </p>
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => goToChat(s.text)}
                  className="flex items-center gap-2 bg-white dark:bg-gray-800 hover:bg-emerald-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 text-gray-700 dark:text-gray-300 text-sm font-medium px-4 py-2 rounded-full transition-all duration-200 active:scale-95 shadow-sm"
                  aria-label={`Consultar: ${s.text}`}
                >
                  <span aria-hidden="true">{s.emoji}</span>
                  {s.text}
                </button>
              ))}
            </div>

            {/* Emergency CTA */}
            <div className="mt-10 flex justify-center animate-fade-in-up delay-500">
              <EmergencyButton />
            </div>
          </div>
        </section>

        {/* ── Features ── */}
        <section
          className="py-16 sm:py-20 px-4 bg-white dark:bg-gray-900"
          aria-labelledby="features-heading"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2
                id="features-heading"
                className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Todo lo que necesitas, en un solo lugar
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Desde orientación de salud hasta guía en la ciudad, ConectaVida
                AI te acompaña en cada situación.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <FeatureCard
                  key={i}
                  icon={f.icon}
                  title={f.title}
                  description={f.description}
                  color={f.color}
                  delay={i * 100}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section
          className="py-16 sm:py-20 px-4 bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-gray-950 dark:to-gray-900"
          aria-labelledby="how-heading"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h2
              id="how-heading"
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Tan fácil como hablar con un amigo
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-lg mb-12">
              No necesitas saber de tecnología. Solo cuéntanos tu problema.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {howSteps.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center animate-fade-in-up"
                  style={{ animationDelay: `${i * 150}ms` }}
                >
                  <div className="w-14 h-14 bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl flex items-center justify-center text-2xl shadow-md mb-4">
                    {item.icon}
                  </div>
                  <div className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-2">
                    Paso {item.step}
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-emerald-100 mb-8 text-lg">
              Únete a los colombianos que ya resuelven sus problemas cotidianos
              con IA.
            </p>
            <a
              href="/chat"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold px-8 py-4 rounded-2xl hover:bg-emerald-50 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-lg"
            >
              💬 Habla con ConectaVida AI
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
