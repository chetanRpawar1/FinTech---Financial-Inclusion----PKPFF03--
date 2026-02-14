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

      <div className="container-fluid py-3" style={{ height: "calc(100vh - 70px)", overflow: "hidden" }}>
        <div className="row h-100 g-4">

          {/* LEFT COLUMN: History (Reduced Width) */}
          <div className="col-lg-4 h-100">
            <div className="card-dark h-100 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0 text-white">History</h5>
                <input type="text" placeholder="Search..." className="form-control form-control-sm w-auto bg-white text-dark border-0" style={{ maxWidth: "150px" }} />
              </div>

              <div className="flex-grow-1" style={{ overflowY: "auto", paddingRight: "5px" }}>
                {Object.entries(history).length === 0 ? (
                  <div className="text-center opacity-50 mt-5 text-white">No history available</div>
                ) : (
                  Object.entries(history).sort().reverse().map(([date, items]) => {
                    const total = items.reduce((s, e) => s + e.amount, 0);
                    const saveVal = smartDailyLimit - total;
                    return (
                      <div key={date} className="mb-3">
                        <div className="d-flex justify-content-between align-items-end mb-1 px-1">
                          <span className="badge bg-secondary opacity-75">{date}</span>
                          <span className="small text-white opacity-75">Daily Balance: <span className="text-white fw-bold">{saveVal}</span></span>
                        </div>
                        <div className="expenses-group ps-2 border-start border-secondary border-opacity-25">
                          {items.map((item, idx) => (
                            <div key={idx} className="expense-item py-2 px-3 mb-1">
                              <span className="text-white">{item.note}</span>
                              <span className="fw-bold text-white">₹{item.amount}</span>
                            </div>
                          ))}
                          <div className="d-flex justify-content-end mt-1">
                            <button className="btn btn-sm text-danger py-0" onClick={() => deleteDate(date)} style={{ fontSize: "0.8rem" }}>Delete Day</button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Controls & Settings (Expanded) */}
          <div className="col-lg-8 h-100 d-flex flex-column">

            {/* Header & Settings */}
            <div className="card-dark mb-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold mb-0 text-white">Dashboard</h4>
                <span className="badge bg-light text-dark">{selectedDate}</span>
              </div>

              {/* Global Settings Row */}
              <div className="row g-2 mb-2">
                <div className="col-6">
                  <label className="text-white fw-bold d-block">Monthly Limit</label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-transparent text-white border-secondary">₹</span>
                    <input
                      type="number"
                      className="form-control bg-transparent text-white border-secondary"
                      placeholder={monthlyTarget}
                      value={monthlyInput}
                      onChange={(e) => setMonthlyInput(e.target.value)}
                      onBlur={() => { if (monthlyInput) { setMonthlyTarget(Number(monthlyInput)); setMonthlyInput(""); } }}
                    />
                  </div>
                </div>
                <div className="col-6">
                  <label className="text-white fw-bold d-block">Credit Limit</label>
                  <div className="input-group input-group-sm">
                    <span className="input-group-text bg-transparent text-white border-secondary">₹</span>
                    <input
                      type="number"
                      className="form-control bg-transparent text-white border-secondary"
                      placeholder={localStorage.getItem("userTotalCredit") || 0}
                      onChange={(e) => {
                        localStorage.setItem("userTotalCredit", e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="row g-2">
                <div className="col-6">
                  <label className="text-white mb-1 d-block">Start Date</label>
                  <input type="date" className="form-control form-control-sm" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-6">
                  <label className="text-white mb-1 d-block">End Date</label>
                  <input type="date" className="form-control form-control-sm" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="metric-card p-3">
                  <small className="text-uppercase opacity-75">Daily Limit</small>
                  <h3 className="mb-0 fw-bold">₹{smartDailyLimit}</h3>
                </div>
              </div>
              <div className="col-6">
                <div className="metric-card secondary p-3">
                  <small className="text-uppercase opacity-75">Remaining</small>
                  <h3 className="mb-0 fw-bold">₹{monthlyRemaining}</h3>
                </div>
              </div>
            </div>

            {/* Add Expense (Compact) */}
            <div className="card-dark flex-grow-1">
              <h5 className="fw-bold mb-3 text-white">Add Transaction</h5>
              <div className="d-flex flex-column gap-2">
                <input
                  type="date"
                  className="form-control"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />
                <input
                  className="form-control"
                  placeholder="Describe expense..."
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
                <div className="d-flex gap-2">
                  <input
                    className="form-control"
                    type="number"
                    placeholder="Amount (₹)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <button className="btn btn-primary" onClick={addExpense} style={{ background: "#4facfe", border: "none" }}>
                    Add
                  </button>
                </div>
              </div>

              <div className="mt-4 p-3 rounded" style={{ background: "rgba(0,0,0,0.2)" }}>
                <div className="d-flex justify-content-between">
                  <span className="text-white">Spent Today:</span>
                  <span className="fw-bold text-white">₹{spent}</span>
                </div>
                <div className="d-flex justify-content-between mt-1">
                  <span className="text-white">Balance:</span>
                  <span className="fw-bold text-white">
                    {dailyBalance >= 0 ? "+" : ""}₹{dailyBalance}
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
