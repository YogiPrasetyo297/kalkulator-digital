"use client";

import { useMemo, useState } from "react";

const bases = ["DEC", "HEX", "OCT", "BIN"];
const operators = ["AND", "OR", "XOR", "NOT", "Lsh", "Rsh"];
const digitRows = [
  ["A", "B", "C", "D"],
  ["E", "F", "7", "8"],
  ["9", "4", "5", "6"],
  ["1", "2", "3", "0"],
];

const baseMap = {
  DEC: 10,
  HEX: 16,
  OCT: 8,
  BIN: 2,
};

const allowedDigits = {
  DEC: new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]),
  HEX: new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"]),
  OCT: new Set(["0", "1", "2", "3", "4", "5", "6", "7"]),
  BIN: new Set(["0", "1"]),
};

function parseInput(value, base) {
  if (!value) {
    return 0;
  }

  return parseInt(value, baseMap[base]);
}

function formatForBase(value, base) {
  const normalized = Number.isFinite(value) ? value : 0;

  switch (base) {
    case "HEX":
      return normalized.toString(16).toUpperCase();
    case "OCT":
      return normalized.toString(8);
    case "BIN":
      return normalized.toString(2);
    case "DEC":
    default:
      return normalized.toString(10);
  }
}

function formatDisplay(value) {
  if (value === "Error") return value;
  // Format hanya urutan angka desimal (0-9) yang utuh
  return value.replace(/\b\d+(\.\d+)?\b/g, (match) => {
    if (match.includes(".")) {
      const [integer, decimal] = match.split(".");
      return Number(integer).toLocaleString("en-US") + "." + decimal;
    }
    return Number(match).toLocaleString("en-US");
  });
}

export default function ProgrammerCalc() {
  const [inputBase, setInputBase] = useState("DEC");
  const [inputValue, setInputValue] = useState("0");
  const [expression, setExpression] = useState("");
  const [storedValue, setStoredValue] = useState(null);
  const [pendingOperator, setPendingOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);

  const currentValue = useMemo(
    () => parseInput(inputValue, inputBase),
    [inputValue, inputBase]
  );

  const allValues = useMemo(
    () => ({
      DEC: formatForBase(currentValue, "DEC"),
      HEX: formatForBase(currentValue, "HEX"),
      OCT: formatForBase(currentValue, "OCT"),
      BIN: formatForBase(currentValue, "BIN"),
    }),
    [currentValue]
  );

  const resetAll = () => {
    setInputValue("0");
    setExpression("");
    setStoredValue(null);
    setPendingOperator(null);
    setOverwrite(false);
  };

  const switchBase = (base) => {
    setInputValue(formatForBase(currentValue, base));
    setInputBase(base);
    setExpression("");
    setOverwrite(true);
  };

  const inputDigit = (digit) => {
    if (!allowedDigits[inputBase].has(digit)) {
      return;
    }

    if (overwrite || inputValue === "0") {
      setInputValue(digit);
      setExpression((current) => {
        // Jika sedang menunggu operand kedua, append ke operator
        if (current && current.endsWith(" ")) {
          return current + digit;
        }
        return digit;
      });
      setOverwrite(false);
      return;
    }

    setInputValue((current) => current + digit);
    setExpression((current) => current + digit);
  };

  const applyBinaryOperation = (operator) => {
    setStoredValue(currentValue);
    setPendingOperator(operator);
    setExpression((current) => {
      // Jika sudah ada operator di akhir (akhiran spasi), replace operatornya
      if (current && current.endsWith(" ")) {
        const parts = current.trim().split(" ");
        parts[parts.length - 1] = operator;
        return parts.join(" ") + " ";
      }
      return formatForBase(currentValue, inputBase) + " " + operator + " ";
    });
    setOverwrite(true);
  };

  const applyUnaryOperation = (operator) => {
    if (operator === "NOT") {
      const result = ~currentValue;
      setInputValue(formatForBase(result, inputBase));
      setExpression(""); // Reset expression setelah unary
      setOverwrite(true);
    }
  };

  const handleOperator = (operator) => {
    if (operator === "NOT") {
      applyUnaryOperation(operator);
      return;
    }

    applyBinaryOperation(operator);
  };

  const handleEquals = () => {
    if (pendingOperator === null || storedValue === null) {
      return;
    }

    let result = currentValue;

    switch (pendingOperator) {
      case "AND":
        result = storedValue & currentValue;
        break;
      case "OR":
        result = storedValue | currentValue;
        break;
      case "XOR":
        result = storedValue ^ currentValue;
        break;
      case "Lsh":
        result = storedValue << currentValue;
        break;
      case "Rsh":
        result = storedValue >> currentValue;
        break;
      default:
        break;
    }

    setInputValue(formatForBase(result, inputBase));
    setExpression("");
    setStoredValue(null);
    setPendingOperator(null);
    setOverwrite(true);
  };

  return (
    <section data-testid="programmer-calc" className="grid gap-6">
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {bases.map((base) => {
          const isExtraBase = ["OCT", "BIN"].includes(base);
          return (
            <div
              key={base}
              className={`rounded-2xl border border-slate-800 bg-slate-900/70 p-5 ${
                isExtraBase ? "hidden xl:block" : ""
              }`}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                {base}
              </p>
              <p
                data-testid={
                  base === "DEC" ? "display" : `${base.toLowerCase()}-display`
                }
                className="mt-6 font-mono text-3xl text-white"
              >
                {base === "DEC"
                  ? formatDisplay(expression || allValues[base])
                  : allValues[base]}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-2xl font-semibold text-white">Input Base</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Pilih basis input, lalu masukkan angka yang valid untuk basis itu.
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {bases.map((base) => {
              const active = base === inputBase;

              return (
                <button
                  key={base}
                  type="button"
                  onClick={() => switchBase(base)}
                  className={`rounded-2xl border px-4 py-2 text-sm font-semibold transition xl:py-4 ${
                    active
                      ? "border-cyan-400/40 bg-cyan-400/10 text-cyan-100"
                      : "border-slate-800 bg-slate-950 text-slate-200 hover:border-cyan-400/40 hover:text-white"
                  }`}
                >
                  {base}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={resetAll}
            aria-label="Clear"
            className="mt-6 w-full rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white xl:py-4"
          >
            C
          </button>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
          <h3 className="text-2xl font-semibold text-white">Programmer Logic</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Operasi bitwise dan shift bekerja pada nilai integer saat ini.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {operators.map((operator) => (
              <button
                key={operator}
                type="button"
                onClick={() => handleOperator(operator)}
                className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white xl:py-4"
              >
                {operator}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-3">
            {digitRows.map((row) => (
              <div key={row.join("-")} className="grid grid-cols-4 gap-3">
                {row.map((digit) => {
                  const disabled = !allowedDigits[inputBase].has(digit);

                  return (
                    <button
                      key={digit}
                      type="button"
                      onClick={() => inputDigit(digit)}
                      disabled={disabled}
                      className={`rounded-2xl border px-4 py-2 text-sm font-medium transition xl:py-4 ${
                        disabled
                          ? "cursor-not-allowed border-slate-900 bg-slate-950/40 text-slate-600"
                          : "border-slate-800 bg-slate-950 text-slate-200 hover:border-cyan-400/40 hover:text-white"
                      }`}
                    >
                      {digit}
                    </button>
                  );
                })}
              </div>
            ))}

            <button
              type="button"
              onClick={handleEquals}
              className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20 xl:py-4"
            >
              =
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
