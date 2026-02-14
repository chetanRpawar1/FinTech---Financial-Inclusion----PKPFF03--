import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import api from "../api";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

export default function Progress() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ totalSpent: 0, budget: 0, savings: 0 });

    useEffect(() => {
        const fetchProgress = async () => {
            try {
                const res = await api.get("/finance/data");
                const user = res.data;

                // Prepare chart data from expenses
                const chartData = user.expenses.reduce((acc, exp) => {
                    const date = exp.date.split("T")[0];
                    const existing = acc.find(d => d.date === date);
                    if (existing) {
                        existing.amount += exp.amount;
                    } else {
                        acc.push({ date, amount: exp.amount });
                    }
                    return acc;
                }, []).sort((a, b) => new Date(a.date) - new Date(b.date));

                setData(chartData);

                const totalSpent = user.expenses.reduce((sum, e) => sum + e.amount, 0);
                setStats({
                    totalSpent,
                    budget: user.budget.monthlyTarget,
                    savings: user.savings
                });
            } catch (err) {
                console.error("Failed to fetch progress:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProgress();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mt-5" style={{ color: "white" }}>
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h2 className="fw-bold mb-1">Financial Progress</h2>
                        <p className="text-light opacity-50">Visualizing your journey since starting with FinGrow</p>
                    </div>
                    <div className="text-end">
                        <span className="badge bg-success rounded-pill px-3 py-2">Account Active</span>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="row g-4 mb-5">
                    <div className="col-md-4">
                        <div className="glass-panel p-4 text-center">
                            <small className="text-uppercase opacity-50 d-block mb-2">Total Expenses</small>
                            <h3 className="fw-bold">₹{stats.totalSpent.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-panel p-4 text-center border-start border-4 border-primary">
                            <small className="text-uppercase opacity-50 d-block mb-2">Monthly Budget</small>
                            <h3 className="fw-bold">₹{stats.budget.toLocaleString()}</h3>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="glass-panel p-4 text-center border-start border-4 border-success">
                            <small className="text-uppercase opacity-50 d-block mb-2">Current Savings</small>
                            <h3 className="fw-bold" style={{ color: "#00e676" }}>₹{stats.savings.toLocaleString()}</h3>
                        </div>
                    </div>
                </div>

                {/* Main Graph */}
                <div className="glass-panel p-4" style={{ height: "450px" }}>
                    <h5 className="fw-bold mb-4">Daily Spending Trend</h5>
                    {data.length > 0 ? (
                        <ResponsiveContainer width="100%" height="90%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#00e676" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#00e676" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                                <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" fontSize={12} tickMargin={10} />
                                <YAxis stroke="rgba(255,255,255,0.5)" fontSize={12} tickFormatter={(value) => `₹${value}`} />
                                <Tooltip
                                    contentStyle={{ background: "#0f2027", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px" }}
                                    itemStyle={{ color: "#00e676", fontWeight: "bold" }}
                                />
                                <Area type="monotone" dataKey="amount" stroke="#00e676" strokeWidth={3} fillOpacity={1} fill="url(#colorAmt)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-100 d-flex align-items-center justify-content-center opacity-25">
                            <p>Not enough data to generate graph yet...</p>
                        </div>
                    )}
                </div>

                <div className="mt-5 glass-panel p-4" style={{ background: "rgba(0, 201, 255, 0.05)" }}>
                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <h5 className="fw-bold mb-2">Keep building your momentum!</h5>
                            <p className="mb-0 text-light opacity-75">Consistency is the key to financial growth. By tracking every rupee, you're 70% more likely to reach your savings goal.</p>
                        </div>
                        <div className="col-lg-4 text-end">
                            <Link to="/learn/budget" className="btn btn-primary rounded-pill px-4">Improve Budget</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
