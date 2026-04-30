export default function EmergencyButton() {
  return (
    <a
      href="tel:123"
      className="relative inline-flex items-center gap-3 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 group overflow-hidden"
      aria-label="Llamar a la línea de emergencias 123"
    >
      {/* Animated ring */}
      <span
        className="absolute -inset-0.5 rounded-2xl bg-red-500 opacity-20 group-hover:animate-ping"
        aria-hidden="true"
      />
      <span className="relative flex items-center gap-3">
        <span className="text-xl" aria-hidden="true">
          🚨
        </span>
        <span className="flex flex-col text-left leading-tight">
          <span className="text-xs opacity-90 font-normal">
            Línea de emergencias
          </span>
          <span className="text-lg font-black tracking-tight">123</span>
        </span>
      </span>
    </a>
  );
}
