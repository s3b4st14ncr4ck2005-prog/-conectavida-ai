"use client";

import Link from "next/link";
import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import AccessibilityMenu from "./AccessibilityMenu";

export default function Header() {
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-emerald-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="ConectaVida AI — Inicio"
        >
          <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-bold text-sm" aria-hidden="true">
              CV
            </span>
          </div>
          <span className="font-bold text-gray-900 dark:text-white text-lg hidden sm:block">
            Conecta<span className="text-emerald-500">Vida</span>
            <span className="text-blue-500 text-sm font-medium ml-1">AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Navegación principal"
        >
          <Link
            href="/"
            className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
          >
            Inicio
          </Link>
          <Link
            href="/chat"
            className="px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 rounded-lg hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-all"
          >
            Chat IA
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          {/* Emergency */}
          <a
            href="tel:123"
            className="hidden sm:flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full transition-all hover:shadow-md active:scale-95"
            aria-label="Llamar a emergencias al 123"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-200 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-100" />
            </span>
            Emergencia 123
          </a>

          {/* Accessibility toggle */}
          <div className="relative">
            <button
              onClick={() => setA11yOpen((o) => !o)}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-lg transition-all"
              aria-label="Opciones de accesibilidad"
              aria-expanded={a11yOpen}
              aria-haspopup="dialog"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle cx="12" cy="5" r="1.5" strokeWidth={2} />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 9h14M9 9l-1 10m8-10l-1 10M9 14h6"
                />
              </svg>
            </button>
            {a11yOpen && (
              <AccessibilityMenu onClose={() => setA11yOpen(false)} />
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={toggle}
            className="p-2 text-gray-500 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-gray-800 rounded-lg transition-all"
            aria-label={
              isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
          >
            {isDark ? (
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
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
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
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all"
            aria-label="Menú de navegación"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3 flex flex-col gap-1">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-800 transition-all"
          >
            Inicio
          </Link>
          <Link
            href="/chat"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-emerald-600 rounded-lg hover:bg-emerald-50 dark:hover:bg-gray-800 transition-all"
          >
            Chat con IA
          </Link>
          <a
            href="tel:123"
            className="mt-2 flex items-center gap-2 bg-red-500 text-white text-sm font-bold px-4 py-3 rounded-xl"
          >
            <span aria-hidden="true">🚨</span> Emergencia — Llama al 123
          </a>
        </div>
      )}
    </header>
  );
}
