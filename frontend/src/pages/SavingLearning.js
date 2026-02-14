import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LearningNav from "../components/LearningNav";
import Footer from "../components/Footer";
import api from "../api";

export default function SavingLearning() {
    const [income, setIncome] = useState("");
    const [totalCredit, setTotalCredit] = useState(0);
    const [expenses, setExpenses] = useState([
        { id: 1, name: "Rent / Housing", amount: "" },
        { id: 2, name: "Food / Groceries", amount: "" },
        { id: 3, name: "Transport", amount: "" },
        { id: 4, name: "Wants / Others", amount: "" },
    ]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get("/finance/data");
                setTotalCredit(res.data.totalDebt || 0);
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        };
        fetchUserData();
    }, []);

    const handleExpenseChange = (id, field, value) => {
        setExpenses(expenses.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
    };

    const addExpense = () => {
        const newId = expenses.length > 0 ? Math.max(...expenses.map(e => e.id)) + 1 : 1;
        setExpenses([...expenses, { id: newId, name: "", amount: "" }]);
    };

    const removeExpense = (id) => {
        setExpenses(expenses.filter(exp => exp.id !== id));
    };

    const totalExpenses = expenses.reduce((sum, item) => sum + Number(item.amount), 0);
    const potentialSavings = Number(income) - totalExpenses;
    const savingsRate = Number(income) > 0 ? (potentialSavings / Number(income)) * 100 : 0;

    // Sync to backend for Investing module
    useEffect(() => {
        if (potentialSavings > 0) {
            api.post("/finance/sync", { savings: potentialSavings })
                .catch(err => console.error("Failed to sync savings:", err));
        }
    }, [potentialSavings]);

    return (
        <>
            <Navbar />
            <div className="container mt-4" style={{ color: "white" }}>
                <LearningNav />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="fw-bold">The Power of Saving</h2>
                    {Number(totalCredit) > 0 && (
                        <span className="badge bg-danger fs-6">Total Credit: Rs. {Number(totalCredit).toLocaleString()}</span>
                    )}
                </div>
                <p className="lead fw-bold">
                    Saving isn't just about putting money away; it's about buying your future freedom.
                    Even small amounts, saved consistently, can grow into a fortune thanks to compound interest.
                </p>

                <hr />

                <div className="row" style={{ color: "white" }}>
                    <div className="col-md-6">
                        <h4 className="fw-bold">Why Save?</h4>
                        <ul className="fw-bold">
                            <li><strong>Emergencies:</strong> Life is unpredictable. An emergency fund protects you from debt.</li>
                            <li><strong>Financial Freedom:</strong> Savings give you the option to take risks, switch careers, or retire early.</li>
                            <li><strong>Big Purchases:</strong> Buy a home, car, or education without high-interest loans.</li>
                        </ul>

                        <h4 className="mt-4 fw-bold">How to Save Effectively</h4>
                        <ol className="fw-bold">
                            <li><strong>Pay Yourself First:</strong> Treat savings like a mandatory bill. Transfer it as soon as you get paid.</li>
                            <li><strong>Automate It:</strong> Set up automatic transfers to your savings account.</li>
                            <li><strong>Cut the "Latte Factor":</strong> Small daily expenses add up. Cooking at home can save thousands a year.</li>
                        </ol>

                        <div className="alert alert-info mt-4 fw-bold" role="alert">
                            <strong>Tip:</strong> Aim to save at least 20% of your income. If that's too hard, start with 5% and increase it by 1% every month.
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card-dark p-3">
                            <h6 className="fw-bold mb-2">Smart Savings Analyzer</h6>
                            <p className="compact-text fw-bold mb-3" style={{ opacity: 0.8, fontSize: "0.75rem" }}>
                                Enter your monthly details below.
                            </p>

                            <div className="mb-2">
                                <label className="form-label compact-text fw-bold mb-1" style={{ fontSize: "0.75rem" }}>Monthly Income</label>
                                <input
                                    type="number"
                                    className="form-control form-control-sm fw-bold"
                                    value={income}
                                    onChange={(e) => setIncome(e.target.value)}
                                    placeholder="0"
                                    style={{ background: "rgba(255, 255, 255, 0.9)", border: "none", fontSize: "0.85rem" }}
                                />
                            </div>

                            <label className="form-label compact-text fw-bold mb-1" style={{ fontSize: "0.75rem" }}>Expenses</label>
                            <div className="mb-2">
                                {expenses.map((exp) => (
                                    <div key={exp.id} className="row g-1 mb-1 align-items-center">
                                        <div className="col-7">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm fw-bold"
                                                value={exp.name}
                                                onChange={(e) => handleExpenseChange(exp.id, "name", e.target.value)}
                                                placeholder="Name"
                                                style={{ background: "rgba(255, 255, 255, 0.9)", border: "none", fontSize: "0.8rem", padding: "4px 8px" }}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="number"
                                                className="form-control form-control-sm fw-bold"
                                                value={exp.amount}
                                                onChange={(e) => handleExpenseChange(exp.id, "amount", e.target.value)}
                                                placeholder="0"
                                                style={{ background: "rgba(255, 255, 255, 0.9)", border: "none", fontSize: "0.8rem", padding: "4px 8px" }}
                                            />
                                        </div>
                                        <div className="col-1 text-end">
                                            <button className="btn btn-sm p-0 border-0 text-danger fw-bold" onClick={() => removeExpense(exp.id)} style={{ fontSize: "1.2rem", lineRound: "1" }}>×</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="btn btn-sm btn-light w-100 mb-2 fw-bold" style={{ fontSize: "0.75rem", padding: "4px" }} onClick={addExpense}>+ Add Expense</button>

                            <hr className="my-2 opacity-25" />

                            {Number(income) > 0 && (
                                <div>
                                    <div className="d-flex justify-content-between mb-1 compact-text fw-bold">
                                        <span>Total Expenses:</span>
                                        <span>Rs.{totalExpenses}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2 compact-text fw-bold">
                                        <span>Potential Savings:</span>
                                        <strong style={{ color: potentialSavings > 0 ? "#00e676" : "#ff6b6b", fontSize: "1rem" }}>
                                            Rs.{potentialSavings}
                                        </strong>
                                    </div>

                                    <div className="progress mb-1" style={{ height: "6px", backgroundColor: "rgba(255,255,255,0.2)" }}>
                                        <div
                                            className="progress-bar"
                                            role="progressbar"
                                            style={{ width: `${Math.max(0, Math.min(100, savingsRate))}%`, backgroundColor: savingsRate >= 20 ? "#00e676" : "#ffc107" }}
                                        ></div>
                                    </div>
                                    <p className="text-center mb-2 fw-bold" style={{ fontSize: "0.7rem" }}>
                                        Saving <strong>{savingsRate.toFixed(1)}%</strong>
                                        {savingsRate >= 20 ? " 🚀" : " ⚠️"}
                                    </p>

                                    {potentialSavings > 0 && (
                                        <div className="text-center">
                                            <a href="/learn/investing" className="btn btn-sm btn-primary fw-bold w-100" style={{ fontSize: "0.75rem" }}>
                                                Grow this Rs.{potentialSavings} 📈
                                            </a>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
