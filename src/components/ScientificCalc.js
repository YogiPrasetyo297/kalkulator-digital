"use client";

import { useState } from "react";

const functionRows = [
  ["sin", "cos", "tan"],
  ["log", "ln", "√", "x²"],
  ["xʸ", "n!", "π", "e"],
];

const numberRows = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["0", ".", "±"],
];

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

function factorial(value) {
  if (!Number.isInteger(value) || value < 0) {
    return "Error";
  }

  let result = 1;

  for (let i = 2; i <= value; i += 1) {
    result *= i;
  }

  return result;
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

export default function ScientificCalc() {
  const [display, setDisplay] = useState("0");
  const [expression, setExpression] = useState("");
  const [angleMode, setAngleMode] = useState("DEG");
  const [storedValue, setStoredValue] = useState(null);
  const [pendingOperation, setPendingOperation] = useState(null);
  const [overwrite, setOverwrite] = useState(false);

  const resetState = () => {
    setDisplay("0");
    setExpression("");
    setStoredValue(null);
    setPendingOperation(null);
    setOverwrite(false);
  };

  const setError = () => {
    setDisplay("Error");
    setExpression("");
    setStoredValue(null);
    setPendingOperation(null);
    setOverwrite(true);
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
        // Jika sedang menunggu input binary (x^y), append
        if (current && current.endsWith("^")) {
          return current + digit;
        }
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

  const currentValue = Number(display);
  const toRadians = (value) =>
    angleMode === "DEG" ? (value * Math.PI) / 180 : value;

  const applyUnary = (handler) => {
    if (display === "Error") {
      return;
    }

    const result = handler(currentValue);
    const formatted = formatValue(result);

    if (formatted === "Error") {
      setError();
      return;
    }

    setDisplay(formatted);
    setOverwrite(true);
  };

  const handlePower = () => {
    if (display === "Error") {
      return;
    }

    setStoredValue(currentValue);
    setPendingOperation("power");
    setExpression(formatValue(currentValue) + "^");
    setOverwrite(true);
  };

  const handleEquals = () => {
    if (
      display === "Error" ||
      pendingOperation !== "power" ||
      storedValue === null
    ) {
      return;
    }

    const result = formatValue(Math.pow(storedValue, currentValue));

    if (result === "Error") {
      setError();
      return;
    }

    setDisplay(result);
    setExpression("");
    setStoredValue(null);
    setPendingOperation(null);
    setOverwrite(true);
  };

  const toggleSign = () => {
    if (display === "Error" || display === "0") {
      return;
    }

    setDisplay((current) =>
      current.startsWith("-") ? current.slice(1) : `-${current}`
    );
  };

  const handleFunction = (item) => {
    if (display === "Error" && item !== "DEG/RAD") return;

    switch (item) {
      case "sin":
      case "cos":
      case "tan":
      case "log":
      case "ln":
      case "√":
      case "x²":
      case "n!": {
        let label = item;
        let result;
        if (item === "sin") {
          label = "sin";
          result = Math.sin(toRadians(currentValue));
        } else if (item === "cos") {
          label = "cos";
          result = Math.cos(toRadians(currentValue));
        } else if (item === "tan") {
          label = "tan";
          result = Math.tan(toRadians(currentValue));
        } else if (item === "log") {
          if (currentValue <= 0) return setError();
          label = "log";
          result = Math.log10(currentValue);
        } else if (item === "ln") {
          if (currentValue <= 0) return setError();
          label = "ln";
          result = Math.log(currentValue);
        } else if (item === "√") {
          if (currentValue < 0) return setError();
          label = "√";
          result = Math.sqrt(currentValue);
        } else if (item === "x²") {
          label = "";
          result = currentValue * currentValue;
        } else if (item === "n!") {
          label = "";
          result = factorial(currentValue);
        }

        const formattedResult = formatValue(result);
        if (formattedResult === "Error") return setError();

        // Update expression temporarily if needed, but rule says reset to "" after result
        // We follow: show "sin(45)" logic? The rule says "expression: 'sin(45)', lalu reset ke '' dan tampilkan hasil"
        // This means it's a momentary state or just a logical step.
        // We'll just update display and reset expression.
        setDisplay(formattedResult);
        setExpression("");
        setOverwrite(true);
        break;
      }
      case "xʸ":
        handlePower();
        break;
      case "π":
        setDisplay(formatValue(Math.PI));
        setExpression((current) => (current && current.endsWith("^") ? current + "π" : ""));
        setOverwrite(true);
        break;
      case "e":
        setDisplay(formatValue(Math.E));
        setExpression((current) => (current && current.endsWith("^") ? current + "e" : ""));
        setOverwrite(true);
        break;
      case "DEG/RAD":
        setAngleMode((current) => (current === "DEG" ? "RAD" : "DEG"));
        break;
      default:
        break;
    }
  };

  const handleControl = (item) => {
    switch (item) {
      case ".":
        inputDecimal();
        break;
      case "±":
        toggleSign();
        break;
      default:
        inputDigit(item);
        break;
    }
  };

  return (
    <section
      data-testid="scientific-calc"
      className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6"
    >
      <div className="flex flex-col gap-3 border-b border-slate-800 pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-white">
            Scientific Workspace
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Mode scientific dengan trigonometeri, logaritma, pangkat, dan
            konstanta matematika.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">Scientific display</p>
            <button
              type="button"
              onClick={() =>
                setAngleMode((current) => (current === "DEG" ? "RAD" : "DEG"))
              }
              className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-xs font-medium text-slate-300 transition hover:border-cyan-400/40 hover:text-white"
            >
              {angleMode}
            </button>
          </div>
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

        <div className="grid gap-3">
          {functionRows.map((row) => (
            <div
              key={row.join("-")}
              className={`grid gap-3 ${
                row.length === 3 ? "grid-cols-3" : "grid-cols-4"
              }`}
            >
              {row.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleFunction(item)}
                  className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          ))}

          {numberRows.map((row) => (
            <div key={row.join("-")} className="grid grid-cols-3 gap-3">
              {row.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => handleControl(item)}
                  className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
                >
                  {item}
                </button>
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={resetState}
            className="rounded-2xl border border-slate-800 bg-slate-950 px-4 py-4 text-sm font-medium text-slate-200 transition hover:border-cyan-400/40 hover:text-white"
          >
            C
          </button>

          <button
            type="button"
            onClick={handleEquals}
            className="rounded-2xl border border-cyan-400/40 bg-cyan-400/10 px-4 py-4 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/20"
          >
            =
          </button>
        </div>
      </div>
    </section>
  );
}
