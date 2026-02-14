import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import api from "../api";

export default function Dashboard() {
  const todayStr = new Date().toISOString().split("T")[0];
  const currentMonth = todayStr.slice(0, 7);

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [loading, setLoading] = useState(true);

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(todayStr);

  const [monthlyTarget, setMonthlyTarget] = useState(10000);
  const [monthlyInput, setMonthlyInput] = useState("");

  const [expenses, setExpenses] = useState([]);
  const [note, setNote] = useState("");
  const [amount, setAmount] = useState("");
  const [history, setHistory] = useState({});
  const [totalDebt, setTotalDebt] = useState(0);

  // Fetch all user data on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/finance/data");
        const user = res.data;

        setMonthlyTarget(user.budget.monthlyTarget || 10000);
        setTotalDebt(user.totalDebt || 0);

        // Group expenses by date for the history view
        const grouped = {};
        user.expenses.forEach(exp => {
          const date = exp.date.split("T")[0];
          if (!grouped[date]) grouped[date] = [];
          grouped[date].push({ note: exp.name, amount: exp.amount });
        });
        setHistory(grouped);
        setExpenses(grouped[selectedDate] || []);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedDate]);

  const syncBudget = async (target) => {
    try {
      await api.post("/finance/budget", { monthlyTarget: target });
    } catch (err) {
      console.error("Failed to sync budget:", err);
    }
  };

  const addExpense = async () => {
    if (!note || !amount) return;
    try {
      const newExpense = { name: note, amount: Number(amount), date: selectedDate };
      const res = await api.post("/finance/expense", newExpense);

      // Update local state after successful backend save
      const grouped = {};
      res.data.forEach(exp => {
        const date = exp.date.split("T")[0];
        if (!grouped[date]) grouped[date] = [];
        grouped[date].push({ note: exp.name, amount: exp.amount });
      });
      setHistory(grouped);
      setExpenses(grouped[selectedDate] || []);

      setNote("");
      setAmount("");
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  const syncDebt = async (debt) => {
    try {
      await api.post("/finance/sync", { totalDebt: Number(debt) });
      setTotalDebt(debt);
    } catch (err) {
      console.error("Failed to sync debt:", err);
    }
  };

  const deleteDate = (date) => {
    const newHistory = { ...history };
    delete newHistory[date];
    setHistory(newHistory);
    if (date === selectedDate) setExpenses([]);
    // Note: To fully persist this, we would need a backend endpoint to delete all expenses for a date.
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

      <div className="container-fluid px-5 py-3 dashboard-container no-scrollbar">
        {/* Header Summary */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h4 className="fw-bold mb-0 text-white">Financial Dashboard</h4>
            <p className="text-light opacity-50 mb-0 compact-text">Overview for {currentMonth}</p>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <span className="badge border border-secondary text-light px-3 py-2 rounded-pill compact-text">
              📅 {selectedDate}
            </span>
          </div>
        </div>

        <div className="row flex-grow-1 g-3 no-scrollbar overflow-hidden">

          {/* Column 1: Wallet Activity (History) */}
          <div className="col-lg-3 d-flex flex-column h-100">
            <div className="glass-panel flex-grow-1 d-flex flex-column overflow-hidden">
              <h6 className="fw-bold text-white mb-3 d-flex align-items-center">
                <span className="me-2">📜</span> History
              </h6>
              <div className="flex-grow-1 overflow-auto no-scrollbar pe-1">
                {Object.entries(history).length === 0 ? (
                  <div className="text-center opacity-30 mt-5 compact-text">Empty vault</div>
                ) : (
                  Object.entries(history).sort().reverse().map(([date, items]) => (
                    <div key={date} className="mb-3 timeline-item">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="fw-bold text-white" style={{ fontSize: '0.75rem' }}>{date}</span>
                        <button className="btn btn-link text-danger p-0 compact-text" onClick={() => deleteDate(date)} style={{ fontSize: '0.7rem', textDecoration: 'none' }}>Remove</button>
                      </div>
                      {items.map((item, idx) => (
                        <div key={idx} className="d-flex justify-content-between compact-text py-1 border-bottom border-white border-opacity-10">
                          <span className="text-light opacity-75">{item.note}</span>
                          <span className="text-white">₹{item.amount}</span>
                        </div>
                      ))}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Daily Focus (Transaction + Today's Status) */}
          <div className="col-lg-5 d-flex flex-column h-100">
            {/* Quick Metrics */}
            <div className="row g-3 mb-3">
              <div className="col-6">
                <div className="glass-panel text-center">
                  <small className="text-uppercase opacity-50 compact-text d-block mb-1" style={{ color: "white" }}>Daily Limit</small>
                  <div className="stat-value">₹{smartDailyLimit}</div>
                </div>
              </div>
              <div className="col-6">
                <div className="glass-panel text-center border-start border-4 border-success">
                  <small className="text-uppercase opacity-50 compact-text d-block mb-1" style={{ color: "white" }}>Total Remaining</small>
                  <div className="stat-value">₹{monthlyRemaining}</div>
                </div>
              </div>
            </div>

            {/* Add Transaction */}
            <div className="glass-panel mb-3">
              <h6 className="fw-bold text-white mb-3">Add Transaction</h6>
              <div className="row g-2">
                <div className="col-md-4">
                  <input type="date" className="form-control form-control-sm bg-dark text-white border-secondary" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
                </div>
                <div className="col-md-5">
                  <input className="form-control form-control-sm bg-dark text-white border-secondary" placeholder="Description..." value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <div className="col-md-3">
                  <input className="form-control form-control-sm bg-dark text-white border-secondary" type="number" placeholder="₹" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="col-12 mt-2">
                  <button className="btn btn-sm btn-success w-100 fw-bold py-2" onClick={addExpense} style={{ borderRadius: '8px', background: '#00e676', border: 'none', color: '#003300' }}>
                    Record Transaction
                  </button>
                </div>
              </div>
            </div>

            {/* Today's Status */}
            <div className="glass-panel flex-grow-1" style={{ background: 'rgba(0, 230, 118, 0.03)' }}>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold text-white mb-0">Today's Pulse</h6>
                <span className={`badge ${dailyBalance >= 0 ? 'bg-success' : 'bg-danger'} rounded-pill`} style={{ fontSize: '0.7rem' }}>
                  {dailyBalance >= 0 ? 'On Track' : 'Over Limit'}
                </span>
              </div>
              <div className="d-flex justify-content-between py-2 border-bottom border-white border-opacity-10 compact-text">
                <span className="text-light opacity-75">Spent Today</span>
                <span className="text-white fw-bold">₹{spent}</span>
              </div>
              <div className="d-flex justify-content-between py-2 compact-text">
                <span className="text-light opacity-75">Daily Remaining</span>
                <span className={`fw-bold ${dailyBalance >= 0 ? 'text-success' : 'text-danger'}`}>
                  {dailyBalance >= 0 ? '+' : ''}₹{dailyBalance}
                </span>
              </div>
            </div>
          </div>

          {/* Column 3: Goals & Boundaries (Settings) */}
          <div className="col-lg-4 d-flex flex-column h-100">
            <div className="glass-panel h-100">
              <h6 className="fw-bold text-white mb-3 d-flex align-items-center">
                <span className="me-2">⚙️</span> Configuration
              </h6>

              <div className="mb-4">
                <label className="text-light opacity-50 compact-text d-block mb-2">Monthly Budget Limit</label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-transparent text-white border-secondary">₹</span>
                  <input
                    type="number"
                    className="form-control bg-transparent text-white border-secondary"
                    placeholder={monthlyTarget}
                    value={monthlyInput}
                    style={{ color: "white" }}
                    onChange={(e) => setMonthlyInput(e.target.value)}
                    onBlur={() => { if (monthlyInput) { setMonthlyTarget(Number(monthlyInput)); syncBudget(Number(monthlyInput)); setMonthlyInput(""); } }}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-light opacity-50 compact-text d-block mb-2">Credit Boundary</label>
                <div className="input-group input-group-sm">
                  <span className="input-group-text bg-transparent text-white border-secondary">₹</span>
                  <input
                    type="number"
                    className="form-control bg-transparent text-white border-secondary"
                    placeholder={totalDebt}
                    onChange={(e) => syncDebt(e.target.value)}
                  />
                </div>
              </div>

              <div className="row g-2 mb-4">
                <div className="col-6">
                  <label className="text-light opacity-50 compact-text d-block mb-1">Start Period</label>
                  <input type="date" className="form-control form-control-sm bg-dark text-white border-secondary" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="col-6">
                  <label className="text-light opacity-50 compact-text d-block mb-1">End Period</label>
                  <input type="date" className="form-control form-control-sm bg-dark text-white border-secondary" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
              </div>

              <div className="mt-auto p-3 rounded bg-white bg-opacity-5 border border-white border-opacity-10">
                <p className="compact-text text-light opacity-75 mb-0">
                  <span className="text-success me-1">💡</span> <div style={{ color: "#070808ff" }}>Tip: Fixed monthly targets help build discipline. Your daily limit updates automatically based on remaining time.

                  </div>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
