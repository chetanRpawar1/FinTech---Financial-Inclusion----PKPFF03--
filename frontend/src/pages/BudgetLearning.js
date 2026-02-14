import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LearningNav from "../components/LearningNav";
import Footer from "../components/Footer";
import api from "../api";

export default function BudgetLearning() {
    const [income, setIncome] = useState("");
    const [totalCredit, setTotalCredit] = useState(0);

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

    const needs = income * 0.5;
    const wants = income * 0.3;
    const savings = income * 0.2;

    return (
        <>
            <Navbar />
            <div className="container mt-4" style={{ color: "white" }}>
                <LearningNav />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2>How to Set a Budget</h2>
                    {Number(totalCredit) > 0 && (
                        <span className="badge bg-danger fs-6">Total Credit: Rs. {Number(totalCredit).toLocaleString()}</span>
                    )}
                </div>
                <p className="lead">
                    Budgeting is the foundation of financial health. It helps you control
                    your spending, track your expenses, and save more money.
                </p>

                <hr />

                <div className="row" style={{ color: "white" }}>
                    <div className="col-md-8">
                        <h4>The 50/30/20 Rule</h4>
                        <p>
                            A simple and effective way to budget is the 50/30/20 rule. It
                            divides your after-tax income into three categories:
                        </p>
                        <ul>
                            <li>
                                <strong>50% Needs:</strong> Essential expenses like rent,
                                groceries, utilities, and transport.
                            </li>
                            <li>
                                <strong>30% Wants:</strong> Non-essential spending like dining
                                out, entertainment, and hobbies.
                            </li>
                            <li>
                                <strong>20% Savings:</strong> Money set aside for future goals,
                                emergency funds, and debt repayment.
                            </li>
                        </ul>

                        <h4 className="mt-4">Steps to create a Budget</h4>
                        <ol>
                            <li>
                                <strong>Calculate Your Net Income:</strong> Know exactly how
                                much money you take home each month.
                            </li>
                            <li>
                                <strong>Track Your Spending:</strong> Review your past bank
                                statements to see where your money goes.
                            </li>
                            <li>
                                <strong>Set Realistic Goals:</strong> Decide what you want to
                                achieve (e.g., save for a vacation, pay off debt).
                            </li>
                            <li>
                                <strong>Make a Plan:</strong> Use the 50/30/20 rule or another
                                method to allocate your funds.
                            </li>
                            <li>
                                <strong>Adjust Your Habits:</strong> Stick to your plan and make
                                changes if you overspend in one category.
                            </li>
                        </ol>
                    </div>

                    <div className="col-md-4">
                        <div className="card-dark p-3">
                            <h5 className="fw-bold">Budget Calculator</h5>
                            <p className="small" style={{ opacity: 0.8 }}>
                                Enter your monthly income to see your 50/30/20 breakdown.
                            </p>
                            <div className="mb-3">
                                <label className="form-label">Monthly Income</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={income}
                                    onChange={(e) => setIncome(Number(e.target.value))}
                                    placeholder="e.g. 5000"
                                    style={{ background: "rgba(255, 255, 255, 0.9)", border: "none" }}
                                />
                            </div>

                            {income > 0 && (
                                <div className="mt-4">
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span>Needs (50%)</span>
                                        <strong style={{ fontSize: "1.2rem" }}>Rs.{needs.toFixed(2)}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center mb-2">
                                        <span>Wants (30%)</span>
                                        <strong style={{ fontSize: "1.2rem" }}>Rs.{wants.toFixed(2)}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <span>Savings (20%)</span>
                                        <strong style={{ fontSize: "1.2rem" }}>Rs.{savings.toFixed(2)}</strong>
                                    </div>
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
