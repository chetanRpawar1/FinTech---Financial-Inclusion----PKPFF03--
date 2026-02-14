import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      nav("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
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
            }}>Welcome Back</span>
          </h2>
          <p className="text-white opacity-75 small">Enter your details to access your account</p>
        </div>

        <form onSubmit={submit}>
          <div className="mb-3">
            <label className="form-label text-white small fw-bold ms-1">Email Address</label>
            <input
              className="form-control"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px solid rgba(255,255,255,0.2)" }}
            />
          </div>

          <div className="mb-4">
            <label className="form-label text-white small fw-bold ms-1">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            Sign In
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="small text-white opacity-75 mb-0">
            Don't have an account? <span className="fw-bold text-white" style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => nav("/signup")}>Sign up</span>
          </p>
        </div>
      </div>
    </div>
  );
}
