import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span
                  className="text-white font-bold text-xs"
                  aria-hidden="true"
                >
                  CV
                </span>
              </div>
              <span className="font-bold text-white">
                ConectaVida{" "}
                <span className="text-emerald-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tu asistente inteligente para la vida cotidiana en Colombia y
              Latinoamérica.
            </p>
          </div>

          {/* Links */}
          <nav aria-label="Servicios del footer">
            <h3 className="font-semibold text-white text-sm mb-3">
              Servicios
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Chat con IA", href: "/chat" },
                { label: "Guía de la ciudad", href: "/chat" },
                { label: "Orientación médica", href: "/chat" },
                { label: "Trámites del gobierno", href: "/chat" },
                { label: "Recursos educativos", href: "/chat" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Emergency numbers */}
          <div>
            <h3 className="font-semibold text-white text-sm mb-3">
              Emergencias Colombia
            </h3>
            <ul className="space-y-2 text-sm" role="list">
              {[
                { label: "Línea de emergencias", number: "123" },
                { label: "Cruz Roja", number: "132" },
                { label: "Defensa Civil", number: "144" },
                { label: "Línea de la mujer", number: "155" },
                { label: "Línea de salud", number: "106" },
              ].map((item) => (
                <li key={item.number}>
                  <a
                    href={`tel:${item.number}`}
                    className="text-gray-400 hover:text-red-400 transition-colors flex items-center gap-2"
                    aria-label={`Llamar a ${item.label}: ${item.number}`}
                  >
                    <span className="text-red-400 font-bold w-8 shrink-0">
                      {item.number}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>© {year} ConectaVida AI. Hecho con 💚 para Colombia.</p>
          <p>
            Esta app orienta pero no reemplaza servicios médicos o de
            emergencia profesionales.
          </p>
        </div>
      </div>
    </footer>
  );
}
