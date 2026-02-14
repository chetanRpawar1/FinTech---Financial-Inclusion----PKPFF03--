import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonth = todayStr.slice(0, 7);

  const [selectedDate, setSelectedDate] = useState(todayStr);

  const [startDate, setStartDate] = useState(
    localStorage.getItem("startDate") || todayStr
  );
  const [endDate, setEndDate] = useState(
    localStorage.getItem("endDate") || todayStr
  );

  const [monthlyTarget, setMonthlyTarget] = useState(
    Number(localStorage.getItem("monthlyTarget")) || 10000
  );
  const [monthlyInput, setMonthlyInput] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses")) || {};
    setHistory(data);
    setExpenses(data[selectedDate] || []);
  }, [selectedDate]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("expenses")) || {};
    data[selectedDate] = expenses;
    localStorage.setItem("expenses", JSON.stringify(data));
    setHistory(data);
  }, [expenses, selectedDate]);

  useEffect(() => {
    localStorage.setItem("startDate", startDate);
  }, [startDate]);

  useEffect(() => {
    localStorage.setItem("endDate", endDate);
  }, [endDate]);

  useEffect(() => {
    localStorage.setItem("monthlyTarget", monthlyTarget);
  }, [monthlyTarget]);

  const addExpense = () => {
    if (!note || !amount) return;
    setExpenses([...expenses, { note, amount: Number(amount) }]);
    setNote("");
    setAmount("");
  };

  const deleteDate = (date) => {
    const data = JSON.parse(localStorage.getItem("expenses")) || {};
    delete data[date];
    localStorage.setItem("expenses", JSON.stringify(data));
    setHistory(data);
    if (date === selectedDate) setExpenses([]);
  };

  const spent = expenses.reduce((s, e) => s + e.amount, 0);

  const monthlySpent = Object.entries(history)
    .filter(([date]) => date.startsWith(currentMonth))
    .reduce((sum, [, items]) => {
      return sum + items.reduce((s, e) => s + e.amount, 0);
    }, 0);

  const today = new Date(todayStr);
  const end = new Date(endDate);

  const remainingDays = Math.max(
    1,
    Math.ceil((end - today) / (1000 * 60 * 60 * 24)) + 1
  );

  const remainingMoney = monthlyTarget - monthlySpent;
  const smartDailyLimit = Math.max(0, Math.floor(remainingMoney / remainingDays));

  const dailyBalance = smartDailyLimit - spent;
  const monthlyRemaining = remainingMoney;

  return (
    <>
      <Navbar />

      <div style={{ display: "flex", justifyContent: "center", padding: "40px 30px" }}>
        <div style={{ width: "720px", maxWidth: "100%" }}>

          <div className="card-dark mb-4 position-relative">

            {/* METRICS BOX */}
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                background: "rgba(255,255,255,0.08)",
                borderRadius: 12,
                padding: "10px 16px",
                display: "flex",
                gap: 30,
                alignItems: "center",
                boxShadow: "0 4px 12px rgba(0,0,0,0.25)"
              }}
            >
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 900 }}>
                  ₹{smartDailyLimit}
                </div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>
                  Allowed / day
                </div>
              </div>

              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 900 }}>
                  ₹{monthlyRemaining}
                </div>
                <div style={{ fontSize: 11, opacity: 0.8 }}>
                  Remaining
                </div>
              </div>
            </div>

            <h4>Daily Challenge</h4>

            {/* DATE */}
            <div className="row mb-3">
              <div className="col-9">
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
              </div>
            </div>

            {/* SAVING PERIOD */}
            <div className="row mb-3">
              <div className="col-6">
                <label className="form-label">Start</label>
                <input
                  type="date"
                  className="form-control"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label className="form-label">End</label>
                <input
                  type="date"
                  className="form-control"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            {/* MONTHLY TARGET */}
            <div className="row mb-3">
              <div className="col-9">
                <input
                  className="form-control"
                  type="number"
                  placeholder="Set monthly target"
                  value={monthlyInput}
                  onChange={(e) => setMonthlyInput(e.target.value)}
                />
              </div>
              <div className="col-3">
                <button
                  className="btn btn-info w-100"
                  onClick={() => {
                    if (monthlyInput) {
                      setMonthlyTarget(Number(monthlyInput));
                      setMonthlyInput("");
                    }
                  }}
                >
                  Set
                </button>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="summary">
              <div><strong>Spent:</strong> ₹{spent}</div>
              <div>
                <strong>Balance:</strong>{" "}
                <span className={dailyBalance >= 0 ? "saved-positive" : "saved-negative"}>
                  ₹{dailyBalance}
                </span>
              </div>
            </div>

            {/* ADD */}
            <div className="row mb-3">
              <div className="col-6">
                <input
                  className="form-control"
                  placeholder="Where spent"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
              <div className="col-3">
                <input
                  className="form-control"
                  type="number"
                  placeholder="₹"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="col-3">
                <button className="btn btn-success w-100" onClick={addExpense}>
                  Add
                </button>
              </div>
            </div>

            <ul className="expense-list">
              {expenses.map((e, i) => (
                <li key={i}>{e.note} — ₹{e.amount}</li>
              ))}
            </ul>

          </div>

          {/* HISTORY */}
          <div className="card-dark">
            <h4>History</h4>

            {Object.entries(history).map(([date, items]) => {
              const total = items.reduce((s, e) => s + e.amount, 0);
              const saveVal = smartDailyLimit - total;

              return (
                <div
                  key={date}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr 1fr auto",
                    alignItems: "center",
                    gap: 10,
                    padding: "6px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.15)"
                  }}
                >
                  <span>{date}</span>
                  <span>Spent ₹{total}</span>
                  <span className={saveVal >= 0 ? "saved-positive" : "saved-negative"}>
                    Balance ₹{saveVal}
                  </span>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteDate(date)}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </>
  );
}
