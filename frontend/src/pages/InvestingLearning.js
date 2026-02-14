import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LearningNav from "../components/LearningNav";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import api from "../api";

export default function InvestingLearning() {
    const [monthlyInvestment, setMonthlyInvestment] = useState("");
    const [annualReturn, setAnnualReturn] = useState(12);
    const [years, setYears] = useState(10);
    const [totalCredit, setTotalCredit] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const res = await api.get("/finance/data");
                setTotalCredit(res.data.totalDebt || 0);
                if (res.data.savings) {
                    setMonthlyInvestment(res.data.savings);
                }
            } catch (err) {
                console.error("Failed to fetch user data:", err);
            }
        };
        fetchUserData();
    }, []);

    const calculateGrowth = () => {
        const P = Number(monthlyInvestment);
        const r = Number(annualReturn) / 100 / 12;
        const n = Number(years) * 12;

        if (P === 0 || r === 0 || n === 0) return { totalInvested: 0, totalValue: 0, estimatedReturns: 0 };

        // Future Value of a Series formula: PMT * (((1 + r)^n - 1) / r) * (1+r) (for beginning of period)
        const fv = P * (((Math.pow(1 + r, n) - 1) / r)) * (1 + r);
        const totalInvested = P * n;

        return {
            totalInvested: Math.round(totalInvested),
            totalValue: Math.round(fv),
            estimatedReturns: Math.round(fv - totalInvested)
        };
    };

    const result = calculateGrowth();

    return (
        <>
            <Navbar />
            <div className="container mt-4" style={{ color: "white" }}>
                <LearningNav />
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="fw-bold">Grow Your Wealth</h2>
                    {Number(totalCredit) > 0 && (
                        <span className="badge bg-danger fs-6">Total Credit: Rs. {Number(totalCredit).toLocaleString()}</span>
                    )}
                </div>
                <p className="lead fw-bold">
                    Investing is how you make your money work for you. By investing your savings,
                    you can beat inflation and build long-term wealth.
                </p>

                <hr />

                <div className="row" style={{ color: "white" }}>
                    <div className="col-md-6">
                        <h4 className="fw-bold">Investment Basics</h4>
                        <ul className="fw-bold">
                            <li className="mb-2"><strong>Stocks:</strong> Buying a small piece of a company. High risk, high reward.</li>
                            <li className="mb-2"><strong>Mutual Funds:</strong> A basket of stocks managed by experts. Good for beginners.</li>
                            <li className="mb-2"><strong>Bonds:</strong> Loaning money to the government or companies. Safer, lower returns.</li>
                            <li className="mb-2"><strong>Compound Interest:</strong> The 8th wonder of the world. Interest earning interest.</li>
                        </ul>

                        <div className="alert alert-warning mt-4 fw-bold" role="alert">
                            <strong>Rule of 72:</strong> Divide 72 by your annual interest rate to see how many years it takes for your money to double.
                            <br />
                            <em>Example: 72 / 12% return = Money doubles in 6 years!</em>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card-dark p-4">
                            <h5 className="fw-bold mb-3">Investment Growth Projector</h5>
                            <p className="small fw-bold" style={{ opacity: 0.8 }}>
                                See how your monthly savings can grow over time.
                            </p>

                            <div className="mb-3">
                                <label className="form-label small fw-bold">Monthly Investment (Rs)</label>
                                <input
                                    type="number"
                                    className="form-control fw-bold"
                                    value={monthlyInvestment}
                                    onChange={(e) => setMonthlyInvestment(e.target.value)}
                                    style={{ background: "rgba(255, 255, 255, 0.9)", border: "none" }}
                                />
                            </div>

                            <div className="row g-2 mb-3">
                                <div className="col-6">
                                    <label className="form-label small fw-bold">Expected Return (%)</label>
                                    <input
                                        type="number"
                                        className="form-control fw-bold"
                                        value={annualReturn}
                                        onChange={(e) => setAnnualReturn(e.target.value)}
                                        style={{ background: "rgba(255, 255, 255, 0.9)", border: "none" }}
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label small fw-bold">Time Period (Years)</label>
                                    <input
                                        type="number"
                                        className="form-control fw-bold"
                                        value={years}
                                        onChange={(e) => setYears(e.target.value)}
                                        style={{ background: "rgba(255, 255, 255, 0.9)", border: "none" }}
                                    />
                                </div>
                            </div>

                            <hr className="my-3" />

                            <div className="mb-2 d-flex justify-content-between fw-bold">
                                <span>Total Invested:</span>
                                <span>Rs. {result.totalInvested.toLocaleString()}</span>
                            </div>
                            <div className="mb-2 d-flex justify-content-between fw-bold" style={{ color: "#059c11ff" }}>
                                <span>Est. Returns:</span>
                                <span>+ Rs. {result.estimatedReturns.toLocaleString()}</span>
                            </div>
                            <div className="mt-3 p-3 rounded d-flex justify-content-between align-items-center fw-bold" style={{ background: "rgba(255,255,255,0.1)" }}>
                                <span style={{ fontSize: "1.1rem" }}>Total Value:</span>
                                <span style={{ fontSize: "1.4rem", color: "#63769bff" }}>Rs. {result.totalValue.toLocaleString()}</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
