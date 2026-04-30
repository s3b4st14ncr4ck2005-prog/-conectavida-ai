"use client";

import { useTheme } from "./ThemeProvider";

interface Props {
  onClose: () => void;
}

export default function AccessibilityMenu({ onClose }: Props) {
  const { isDark, toggle, fontSize, increaseFontSize, decreaseFontSize, resetFontSize } =
    useTheme();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú de accesibilidad"
      className="absolute right-0 top-full mt-2 z-50 w-72 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-4 animate-fade-in"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-gray-900 dark:text-white text-sm">
          Accesibilidad
        </h2>
        <button
          onClick={onClose}
          className="p-1 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Cerrar menú de accesibilidad"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="space-y-5">
        {/* Dark mode */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Modo oscuro
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Reduce el brillo de pantalla
            </p>
          </div>
          <button
            onClick={toggle}
            role="switch"
            aria-checked={isDark}
            aria-label={isDark ? "Desactivar modo oscuro" : "Activar modo oscuro"}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 ${
              isDark ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-600"
            }`}
          >
            <span
              className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
                isDark ? "translate-x-7" : "translate-x-1"
              }`}
            />
          </button>
        </div>

        {/* Font size */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Tamaño de texto
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400 tabular-nums">
              {fontSize}px
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={decreaseFontSize}
              disabled={fontSize <= 14}
              aria-label="Reducir tamaño del texto"
              className="flex-1 py-2 text-sm font-bold border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              A−
            </button>
            <button
              onClick={resetFontSize}
              aria-label="Restablecer tamaño de texto normal"
              className="flex-1 py-2 text-xs border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
            >
              Normal
            </button>
            <button
              onClick={increaseFontSize}
              disabled={fontSize >= 22}
              aria-label="Aumentar tamaño del texto"
              className="flex-1 py-2 text-sm font-bold border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              A+
            </button>
          </div>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            ConectaVida AI cumple con estándares WCAG 2.1 AA
          </p>
        </div>
      </div>
    </div>
  );
}
