"use client";

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StandardCalc from "../components/StandardCalc";
import ScientificCalc from "../components/ScientificCalc";
import ProgrammerCalc from "../components/ProgrammerCalc";
import Converter from "../components/Converter";

const MODES = [
  {
    id: "standard",
    label: "Standard",
    description: "Kalkulasi dasar dengan memory dan history perhitungan",
    component: StandardCalc,
  },
  {
    id: "scientific",
    label: "Scientific",
    description: "Trigonometri, logaritma, pangkat, dan konstanta matematika",
    component: ScientificCalc,
  },
  {
    id: "programmer",
    label: "Programmer",
    description: "Operasi bitwise, shift, dan konversi basis bilangan",
    component: ProgrammerCalc,
  },
  {
    id: "converter",
    label: "Converter",
    description: "Konversi satuan data dan sudut",
    component: Converter,
  },
];

export default function Home() {
  const [activeMode, setActiveMode] = useState("standard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentMode =
    MODES.find((mode) => mode.id === activeMode) ?? MODES[0];
  const ActiveComponent = currentMode.component;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row">
        <Sidebar
          className="hidden lg:flex"
          modes={MODES}
          activeMode={activeMode}
          onSelectMode={setActiveMode}
        />
        <section className="flex-1 border-t border-slate-800 lg:border-t-0 lg:border-l">
          <div className="flex min-h-full flex-col">
            <header className="border-b border-slate-800 px-6 py-5 sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-400">
                Kalkulator Digital
              </p>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div className="mt-2 flex items-start gap-3">
                  {/* Hamburger — mobile only */}
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-slate-700 text-slate-400 transition hover:text-white lg:hidden"
                    aria-label="Buka menu"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                  <div>
                    <h1 className="text-3xl font-semibold text-white">
                      {currentMode.label} Mode
                    </h1>
                    <p className="mt-1 max-w-2xl text-sm text-slate-400">
                      {currentMode.description}
                    </p>
                  </div>
                </div>
              </div>
            </header>
            <div className="flex-1 p-6 sm:p-8">
              <ActiveComponent />
            </div>
          </div>
        </section>
      </div>

      {/* Sidebar Drawer — mobile only */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div
            className="absolute bottom-0 left-0 top-0 w-72 overflow-y-auto bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar
              modes={MODES}
              activeMode={activeMode}
              onSelectMode={(id) => {
                setActiveMode(id);
                setSidebarOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
}
