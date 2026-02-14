import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import api from "../api";

export default function Signup() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError("");
    if (!form.username || !form.email || !form.password) {
      setError("All fields required");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Invalid email");
      return;
    }

    setLoading(true);
    try {
      await api.post("/auth/signup", form);
      nav("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 70px)" }}>
      <div className="card-dark p-5" style={{ width: "400px", maxWidth: "90%" }}>
        <div className="text-center mb-4">
          <img src={logo} style={{ width: "80px", marginBottom: "20px" }} alt="Logo" />
          <h2 className="fw-bold mb-1" style={{ fontSize: "2rem" }}>
            <span style={{
              background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent"
            }}>Join FinGrow</span>
          </h2>
          <p className="text-white opacity-75 small">Create an account to start your journey</p>
        </div>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label text-white small fw-bold ms-1">Username</label>
            <input
              className="form-control"
              placeholder="Your Name"
              value={form.username}
              onChange={e => setForm({ ...form, username: e.target.value })}
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-white small fw-bold ms-1">Email Address</label>
            <input
              className="form-control"
              placeholder="name@example.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-white small fw-bold ms-1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </div>

          {error && <div className="alert alert-danger py-2 small border-0 bg-danger bg-opacity-25 text-white mb-3">{error}</div>}

          <button className="btn w-100 py-3 fw-bold mt-2"
            style={{
              background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)",
              color: "#003300",
              border: "none",
              boxShadow: "0 4px 15px rgba(0,230,118,0.3)"
            }}>
            Create Account
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="small text-white opacity-75 mb-0">
            Already have an account? <span className="fw-bold text-white" style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => nav("/login")}>Sign in</span>
          </p>
        </div>
      </div>
    </div>
  );
}
