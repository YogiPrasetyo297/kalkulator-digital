"use client";

import { useMemo, useState } from "react";

const categoryConfig = {
  Panjang: {
    units: ["m", "cm", "km", "in", "ft"],
    toBase: {
      m: (value) => value,
      cm: (value) => value / 100,
      km: (value) => value * 1000,
      in: (value) => value * 0.0254,
      ft: (value) => value * 0.3048,
    },
    fromBase: {
      m: (value) => value,
      cm: (value) => value * 100,
      km: (value) => value / 1000,
      in: (value) => value / 0.0254,
      ft: (value) => value / 0.3048,
    },
  },
  Berat: {
    units: ["kg", "g", "lb", "oz"],
    toBase: {
      kg: (value) => value,
      g: (value) => value / 1000,
      lb: (value) => value * 0.45359237,
      oz: (value) => value * 0.0283495231,
    },
    fromBase: {
      kg: (value) => value,
      g: (value) => value * 1000,
      lb: (value) => value / 0.45359237,
      oz: (value) => value / 0.0283495231,
    },
  },
  Suhu: {
    units: ["C", "F", "K"],
    convert: (value, from, to) => {
      let celsius = value;

      if (from === "F") {
        celsius = ((value - 32) * 5) / 9;
      } else if (from === "K") {
        celsius = value - 273.15;
      }

      if (to === "C") {
        return celsius;
      }

      if (to === "F") {
        return (celsius * 9) / 5 + 32;
      }

      return celsius + 273.15;
    },
  },
  Luas: {
    units: ["m2", "cm2", "km2", "ha"],
    toBase: {
      m2: (value) => value,
      cm2: (value) => value / 10000,
      km2: (value) => value * 1000000,
      ha: (value) => value * 10000,
    },
    fromBase: {
      m2: (value) => value,
      cm2: (value) => value * 10000,
      km2: (value) => value / 1000000,
      ha: (value) => value / 10000,
    },
  },
  Kecepatan: {
    units: ["m/s", "km/h", "mph", "knot"],
    toBase: {
      "m/s": (value) => value,
      "km/h": (value) => value / 3.6,
      mph: (value) => value * 0.44704,
      knot: (value) => value * 0.514444,
    },
    fromBase: {
      "m/s": (value) => value,
      "km/h": (value) => value * 3.6,
      mph: (value) => value / 0.44704,
      knot: (value) => value / 0.514444,
    },
  },
  Data: {
    units: ["bit", "KB", "MB", "GB", "TB"],
    toBase: {
      bit: (v) => v,
      KB: (v) => v * 8192,
      MB: (v) => v * 8388608,
      GB: (v) => v * 8589934592,
      TB: (v) => v * 8796093022208,
    },
    fromBase: {
      bit: (v) => v,
      KB: (v) => v / 8192,
      MB: (v) => v / 8388608,
      GB: (v) => v / 8589934592,
      TB: (v) => v / 8796093022208,
    },
  },
  Angle: {
    units: ["deg", "rad", "grad"],
    toBase: {
      deg: (v) => v,
      rad: (v) => (v * 180) / Math.PI,
      grad: (v) => v * 0.9,
    },
    fromBase: {
      deg: (v) => v,
      rad: (v) => (v * Math.PI) / 180,
      grad: (v) => v / 0.9,
    },
  },
};

function formatValue(value) {
  if (!Number.isFinite(value)) {
    return "0";
  }

  if (Number.isInteger(value)) {
    return String(value);
  }

  return parseFloat(value.toFixed(8)).toString();
}

function convertValue(value, category, fromUnit, toUnit) {
  if (fromUnit === toUnit) {
    return value;
  }

  const config = categoryConfig[category];

  if (category === "Suhu") {
    return config.convert(value, fromUnit, toUnit);
  }

  const baseValue = config.toBase[fromUnit](value);
  return config.fromBase[toUnit](baseValue);
}

export default function Converter() {
  const categories = Object.keys(categoryConfig);
  const [category, setCategory] = useState(categories[0]);
  const [fromUnit, setFromUnit] = useState(
    categoryConfig[categories[0]].units[0]
  );
  const [toUnit, setToUnit] = useState(categoryConfig[categories[0]].units[1]);
  const [input, setInput] = useState("0");

  const units = categoryConfig[category].units;

  const result = useMemo(() => {
    const numericValue = Number(input || 0);
    const converted = convertValue(numericValue, category, fromUnit, toUnit);
    return formatValue(converted);
  }, [category, fromUnit, input, toUnit]);

  const handleCategoryChange = (nextCategory) => {
    const nextUnits = categoryConfig[nextCategory].units;
    setCategory(nextCategory);
    setFromUnit(nextUnits[0]);
    setToUnit(nextUnits[1] ?? nextUnits[0]);
  };

  return (
    <section
      data-testid="converter"
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
    >
      <div className="border-b border-slate-800 pb-5">
        <h3 className="text-2xl font-semibold text-white">
          Converter Workspace
        </h3>
        <p className="mt-2 text-sm leading-6 text-slate-400">
          Pilih kategori, tentukan satuan asal dan tujuan, lalu lihat hasil
          konversinya secara langsung.
        </p>
      </div>

      <div className="mt-6">
        {/* Category Pills */}
        <div
          className="mb-6 flex gap-2 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => handleCategoryChange(item)}
              className={`flex-shrink-0 rounded-full border px-4 py-2 text-xs font-medium transition ${
                category === item
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-100"
                  : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-600 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <label
                className="text-sm font-medium text-slate-300"
                htmlFor="from-unit"
              >
                Satuan asal
              </label>
              <select
                id="from-unit"
                value={fromUnit}
                onChange={(event) => setFromUnit(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
              <label
                className="text-sm font-medium text-slate-300"
                htmlFor="to-unit"
              >
                Satuan tujuan
              </label>
              <select
                id="to-unit"
                value={toUnit}
                onChange={(event) => setToUnit(event.target.value)}
                className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4">
            <label
              className="text-sm font-medium text-slate-300"
              htmlFor="converter-input"
            >
              Nilai input
            </label>
            <input
              id="converter-input"
              type="number"
              step="any"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="mt-3 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none"
            />
          </div>

          {/* Results Card - Now at the bottom */}
          <div className="rounded-2xl border border-slate-800 bg-slate-950 p-6">
            <p className="text-sm text-slate-500">Hasil Konversi</p>
            <div className="mt-4 flex items-baseline gap-2">
              <p data-testid="display" className="font-mono text-4xl text-white">
                {result}
              </p>
              <p className="text-lg font-medium text-slate-400">{toUnit}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
