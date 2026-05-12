"use client";

import { useState, useEffect } from "react";

const buttonRows = [
  ["⌫", "C", "±", "%"],
  ["7", "8", "9", "÷"],
  ["4", "5", "6", "×"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

const operatorMap = {
  "+": (left, right) => left + right,
  "-": (left, right) => left - right,
  "×": (left, right) => left * right,
  "÷": (left, right) => {
    if (right === 0) {
      return "Error";
    }

    return left / right;
  },
};

function formatValue(value) {
  if (value === "Error") {
    return value;
  }

  const number = Number(value);

  if (!Number.isFinite(number)) {
    return "Error";
  }

  if (Number.isInteger(number)) {
    return String(number);
  }

  return parseFloat(number.toFixed(10)).toString();
}

function formatDisplay(value) {
  if (value === "Error") return value;
  // Format setiap urutan angka dalam ekspresi (termasuk desimal)
  return value.replace(/\d+(\.\d+)?/g, (match) => {
    const [integer, decimal] = match.split(".");
    const formatted = Number(integer).toLocaleString("en-US");
    return decimal !== undefined ? `${formatted}.${decimal}` : formatted;
  });
}

export default function StandardCalc() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [storedValue, setStoredValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [overwrite, setOverwrite] = useState(false);
  const [history, setHistory] = useState([]);
  const [memory, setMemory] = useState(null);
  const [showHistoryDrawer, setShowHistoryDrawer] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("calc-history");
      if (saved) setHistory(JSON.parse(saved));
    } catch {
      // localStorage kosong atau corrupt, abaikan
    }
  }, []);

  const clearAll = () => {
    setDisplay("0");
    setExpression("");
    setStoredValue(null);
    setOperator(null);
    setOverwrite(false);
  };

  const inputDigit = (digit) => {
    if (display === "Error") {
      setDisplay(digit);
      setExpression(digit);
      setOverwrite(false);
      return;
    }

    if (overwrite || display === "0") {
      setDisplay(digit);
      setExpression((current) => {
        // Jika sedang membangun ekspresi (ada operator di akhir), append digit
        if (current && /[\+\-×÷]$/.test(current)) {
          return current + digit;
        }
        // Jika tidak, ganti total (untuk angka pertama atau setelah =)
        return digit;
      });
      setOverwrite(false);
      return;
    }

    setDisplay((current) => current + digit);
    setExpression((current) => current + digit);
  };

  const inputDecimal = () => {
    if (display === "Error") {
      setDisplay("0.");
      setOverwrite(false);
      return;
    }

    if (overwrite) {
      setDisplay("0.");
      setOverwrite(false);
      return;
    }

    if (!display.includes(".")) {
      setDisplay((current) => current + ".");
    }
  };

  const calculate = (leftValue, nextOperator, rightValue) => {
    const operation = operatorMap[nextOperator];

    if (!operation) {
      return formatValue(rightValue);
    }

    return formatValue(operation(Number(leftValue), Number(rightValue)));
  };

  const chooseOperator = (nextOperator) => {
    if (display === "Error") {
      return;
    }

    if (operator && !overwrite) {
      const result = calculate(storedValue, operator, display);

      if (result === "Error") {
        clearAll();
        setDisplay("Error");
        return;
      }

      setStoredValue(result);
      setDisplay(result);
      setExpression(result + nextOperator);
    } else {
      setStoredValue(display);
      setExpression((current) => {
        // Jika sudah ada operator di akhir, ganti operatornya
        if (current && /[\+\-×÷]$/.test(current)) {
          return current.slice(0, -1) + nextOperator;
        }
        // Jika belum, append operator ke display saat ini (atau expression)
        return (current || display) + nextOperator;
      });
    }

    setOperator(nextOperator);
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (!operator || storedValue === null || display === "Error") {
      return;
    }

    const result = calculate(storedValue, operator, display);

    if (result === "Error") {
      clearAll();
      setDisplay("Error");
      return;
    }

    // Bangun expression dari state yang sudah committed (bukan dari "expression" state)
    const expressionSnapshot = `${storedValue}${operator}${display}`;

    const newEntry = {
      expression: expressionSnapshot,
      result,
      timestamp: Date.now(),
    };
    const updated = [...history, newEntry].slice(-50);
    setHistory(updated);
    localStorage.setItem("calc-history", JSON.stringify(updated));

    setDisplay(result);
    setExpression("");
    setStoredValue(null);
    setOperator(null);
    setOverwrite(true);
  };

  const handleBackspace = () => {
    if (display === "Error" || overwrite) {
      setDisplay("0");
      setExpression("");
      setOverwrite(false);
      return;
    }
    if (display.length <= 1) {
      setDisplay("0");
      setExpression((current) => {
        // Jika expression ada, hapus digit terakhir dari expression juga
        if (current && !/[\+\-×÷]$/.test(current)) {
          return current.slice(0, -1) || "";
        }
        return current;
      });
      return;
    }
    setDisplay((current) => current.slice(0, -1));
    setExpression((current) => {
      if (current && !/[\+\-×÷]$/.test(current)) {
        return current.slice(0, -1);
      }
      return current;
    });
  };

  const toggleSign = () => {
    if (display === "Error" || display === "0") {
      return;
    }

    setDisplay((current) =>
      current.startsWith("-") ? current.slice(1) : `-${current}`
    );
  };

  const applyPercent = () => {
    if (display === "Error") {
      return;
    }

    setDisplay(formatValue(Number(display) / 100));
    setOverwrite(true);
  };

  const handleMemory = (btn) => {
    const current = Number(display);
    switch (btn) {
      case "M+":
        setMemory((prev) => (prev === null ? current : prev + current));
        break;
      case "M-":
        setMemory((prev) => (prev === null ? -current : prev - current));
        break;
      case "MR":
        if (memory !== null) {
          const memVal = formatValue(memory);
          setExpression((expr) => {
            if (expr && /[\+\-×÷]$/.test(expr)) {
              return expr + memVal;
            }
            return memVal;
          });
          setDisplay(memVal);
          setOverwrite(true);
        }
        break;
      case "MC":
        setMemory(null);
        break;
      default:
        break;
    }
  };

  const handleButtonClick = (button) => {
    if (/^\d$/.test(button)) {
      inputDigit(button);
      return;
    }

    switch (button) {
      case ".":
        inputDecimal();
        break;
      case "+":
      case "-":
      case "×":
      case "÷":
        chooseOperator(button);
        break;
      case "=":
        handleEquals();
        break;
      case "⌫":
        handleBackspace();
        break;
      case "C":
        clearAll();
        break;
      case "±":
        toggleSign();
        break;
      case "%":
        applyPercent();
        break;
      default:
        break;
    }
  };

  return (
    <section
      data-testid="standard-calc"
      className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_280px]"
    >
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-5 shadow-2xl shadow-slate-950/30">
        <div className="relative rounded-2xl border border-slate-800 bg-slate-950 p-5">
          {/* Mobile Display Header (Memory + History Toggle) */}
          <div className="absolute right-4 top-4 flex items-center gap-3 lg:hidden">
            {memory !== null && (
              <span className="text-[10px] font-bold text-cyan-400/80">
                M = {formatDisplay(formatValue(memory))}
              </span>
            )}
            <button
              type="button"
              onClick={() => setShowHistoryDrawer(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-900 text-slate-400 transition hover:text-white"
              aria-label="Lihat history"
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
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
          <p className="text-sm text-slate-500">Display</p>
          <p
            data-testid="display"
            className={`mt-10 text-right font-mono text-white transition-all ${
              formatDisplay(expression || display).length > 14
                ? "text-3xl"
                : formatDisplay(expression || display).length > 10
                ? "text-4xl"
                : "text-5xl"
            }`}
          >
            {formatDisplay(expression || display)}
          </p>
        </div>

        <div className="mt-5 grid gap-3">
          {/* Memory row */}
          <div className="grid grid-cols-4 gap-3">
            {["MC", "MR", "M-", "M+"].map((btn) => (
              <button
                key={btn}
                type="button"
                onClick={() => handleMemory(btn)}
                disabled={["MR", "M-"].includes(btn) && memory === null}
                className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-3 text-xs font-medium text-slate-400 transition hover:border-cyan-400/40 hover:text-white disabled:cursor-not-allowed disabled:text-slate-700"
              >
                {btn}
              </button>
            ))}
          </div>

          {buttonRows.map((row) => (
            <div key={row.join("-")} className="grid grid-cols-4 gap-3">
              {row.map((button) => (
                <button
                  key={button}
                  type="button"
                  onClick={() => handleButtonClick(button)}
                  className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
                >
                  {button}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <aside className="hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-5 lg:block">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Memory & History
        </h3>

        {memory !== null && (
          <p className="mb-2 text-right text-xs text-cyan-400">
            M = {formatDisplay(formatValue(memory))}
          </p>
        )}

        <div className="mb-6 grid grid-cols-4 gap-2">
          {["MC", "MR", "M-", "M+"].map((btn) => (
            <button
              key={btn}
              type="button"
              onClick={() => handleMemory(btn)}
              disabled={["MR", "M-"].includes(btn) && memory === null}
              className="rounded-xl border border-slate-800 bg-slate-950 px-2 py-3 text-xs font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white disabled:cursor-not-allowed disabled:text-slate-600"
            >
              {btn}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-semibold text-white">History</h3>
        {history.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-700 p-4 text-sm text-slate-500">
            Belum ada data.
          </div>
        ) : (
          <ul className="mt-4 flex flex-col gap-2">
            {[...history].reverse().map((entry, i) => (
              <li
                key={entry.timestamp + i}
                className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
              >
                <p className="text-xs text-slate-500">
                  {formatDisplay(entry.expression)} =
                </p>
                <p className="text-right font-mono text-lg text-white">
                  {formatDisplay(entry.result)}
                </p>
              </li>
            ))}
          </ul>
        )}
        {history.length > 0 && (
          <button
            type="button"
            onClick={() => {
              setHistory([]);
              localStorage.removeItem("calc-history");
            }}
            className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-slate-400 transition hover:text-white"
          >
            Hapus semua
          </button>
        )}
      </aside>

      {/* History Drawer — mobile only */}
      {showHistoryDrawer && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          onClick={() => setShowHistoryDrawer(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Drawer */}
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-3xl border-t border-slate-700 bg-slate-900 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">History</h3>
              <button
                type="button"
                onClick={() => setShowHistoryDrawer(false)}
                className="rounded-full p-1 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>
            {history.length === 0 ? (
              <p className="text-sm text-slate-500">Belum ada data.</p>
            ) : (
              <ul className="flex flex-col gap-2">
                {[...history].reverse().map((entry, i) => (
                  <li
                    key={entry.timestamp + i}
                    className="rounded-xl border border-slate-800 bg-slate-950 px-4 py-3"
                  >
                    <p className="text-xs text-slate-500">
                      {formatDisplay(entry.expression)} =
                    </p>
                    <p className="text-right font-mono text-lg text-white">
                      {formatDisplay(entry.result)}
                    </p>
                  </li>
                ))}
              </ul>
            )}
            {history.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setHistory([]);
                  localStorage.removeItem("calc-history");
                  setShowHistoryDrawer(false);
                }}
                className="mt-4 w-full rounded-xl border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-slate-400 transition hover:text-white"
              >
                Hapus semua
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
