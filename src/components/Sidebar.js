export default function Sidebar({ modes, activeMode, onSelectMode, className = "" }) {
  return (
    <aside className={`w-full bg-slate-900/80 lg:flex lg:w-72 lg:flex-col ${className}`}>
      <div className="border-b border-slate-800 px-6 py-6">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          Navigation
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-white">
          Calculator
        </h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Pilih mode kalkulator untuk melihat area kerja yang akan dikembangkan.
        </p>
      </div>

      <nav className="grid gap-3 px-4 py-4 sm:grid-cols-2 lg:grid-cols-1 lg:px-6">
        {modes.map((mode, index) => {
          const isActive = mode.id === activeMode;

          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onSelectMode(mode.id)}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                isActive
                  ? "border-cyan-400/50 bg-cyan-400/10 text-white shadow-[0_0_0_1px_rgba(34,211,238,0.18)]"
                  : "border-slate-800 bg-slate-950/70 text-slate-300 hover:border-slate-700 hover:bg-slate-900"
              }`}
            >
              <span
                aria-hidden="true"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500"
              >
                Mode {index + 1}
              </span>
              <span className="mt-2 block text-lg font-semibold">
                {mode.label}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
