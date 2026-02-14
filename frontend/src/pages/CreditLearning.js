import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

export default function CreditLearning() {
    const [credits, setCredits] = useState([
        { id: 1, name: "Credit Card", amount: "" },
        { id: 2, name: "Student Loan", amount: "" },
    ]);

    useEffect(() => {
        // Load credits from local storage if available
        const savedCredits = localStorage.getItem("userCredits");
        if (savedCredits) {
            setCredits(JSON.parse(savedCredits));
        }
    }, []);

    useEffect(() => {
        // Save credits to local storage whenever they change
        localStorage.setItem("userCredits", JSON.stringify(credits));

        // Also save total credit calculation for other pages
        const total = credits.reduce((sum, item) => sum + Number(item.amount), 0);
        localStorage.setItem("userTotalCredit", total);
    }, [credits]);

    const handleCreditChange = (id, field, value) => {
        setCredits(credits.map(cred => cred.id === id ? { ...cred, [field]: value } : cred));
    };

    const addCredit = () => {
        const newId = credits.length > 0 ? Math.max(...credits.map(e => e.id)) + 1 : 1;
        setCredits([...credits, { id: newId, name: "", amount: "" }]);
    };

    const removeCredit = (id) => {
        setCredits(credits.filter(cred => cred.id !== id));
    };

    const totalCredit = credits.reduce((sum, item) => sum + Number(item.amount), 0);

    return (
        <>
            <Navbar />
            <div className="container mt-4" style={{ color: "white", fontFamily: "Verdana, sans-serif" }}>
                <h2 className="fw-bold">Understanding Credit</h2>
                <p className="lead fw-bold">
                    Credit is a powerful tool if used wisely. It allows you to borrow money now and pay it back later.
                    However, mismanagement can lead to a debt trap.
                </p>

                <hr />

                <div className="row" style={{ color: "white" }}>
                    <div className="col-md-6">
                        <h4 className="fw-bold">Credit Basics</h4>
                        <ul className="fw-bold">
                            <li className="mb-2"><strong>Credit Score:</strong> A number that represents your creditworthiness. Higher is better (750+).</li>
                            <li className="mb-2"><strong>Interest Rate:</strong> The cost of borrowing money. Pay off balances in full to avoid this!</li>
                            <li className="mb-2"><strong>Good Debt vs. Bad Debt:</strong>
                                <ul>
                                    <li><em>Good:</em> Mortgage, Education (investing in future).</li>
                                    <li><em>Bad:</em> High-interest credit cards for luxury items.</li>
                                </ul>
                            </li>
                        </ul>

                        <div className="alert alert-danger mt-4 fw-bold" role="alert">
                            <strong>Warning:</strong> Missing payments can severely drop your credit score and stay on your report for years.
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="card-dark p-4">
                            <h5 className="fw-bold mb-3">Your Credit/Debt Tracker</h5>
                            <p className="small fw-bold" style={{ opacity: 0.8 }}>
                                List all your current debts to get a clear picture of what you owe.
                            </p>

                            <div className="mb-2 d-flex justify-content-between text-muted small fw-bold">
                                <span className="ms-1">Source Name</span>
                                <span className="me-5">Amount (Rs)</span>
                            </div>

                            <div className="mb-3" style={{ maxHeight: "300px", overflowY: "auto", paddingRight: "5px" }}>
                                {credits.map((cred) => (
                                    <div key={cred.id} className="row g-2 mb-2 align-items-center">
                                        <div className="col-7">
                                            <input
                                                type="text"
                                                className="form-control form-control-sm fw-bold"
                                                value={cred.name}
                                                onChange={(e) => handleCreditChange(cred.id, "name", e.target.value)}
                                                placeholder="e.g., Credit Card"
                                                style={{ background: "rgba(255, 255, 255, 0.9)", border: "none" }}
                                            />
                                        </div>
                                        <div className="col-4">
                                            <input
                                                type="number"
                                                className="form-control form-control-sm fw-bold"
                                                value={cred.amount}
                                                onChange={(e) => handleCreditChange(cred.id, "amount", e.target.value)}
                                                placeholder="0"
                                                style={{ background: "rgba(255, 255, 255, 0.9)", border: "none" }}
                                            />
                                        </div>
                                        <div className="col-1">
                                            <button className="btn btn-sm btn-outline-danger fw-bold" onClick={() => removeCredit(cred.id)}>×</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button className="btn btn-sm btn-light w-100 mb-3 fw-bold" onClick={addCredit}>+ Add Credit Source</button>

                            <hr className="my-3" />

                            <div className="d-flex justify-content-between align-items-center fw-bold p-3 rounded" style={{ background: "rgba(255, 87, 87, 0.2)" }}>
                                <span style={{ fontSize: "1.1rem" }}>Total Debt:</span>
                                <span style={{ fontSize: "1.4rem", color: "#ff6b6b" }}>Rs. {totalCredit.toLocaleString()}</span>
                            </div>

                            <p className="text-center small mt-3 mb-0 fw-bold" style={{ opacity: 0.7 }}>
                                This total will be visible across all learning modules to keep you aware.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
