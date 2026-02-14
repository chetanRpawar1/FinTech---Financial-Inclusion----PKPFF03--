import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfile, setShowProfile] = useState(false);

  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.username || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowProfile(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav
        className="navbar px-4 shadow-sm py-2"
        style={{ background: "#ffffff", borderRadius: "0 0 20px 20px", zIndex: 1000 }}
      >
        <Link to="/">
          <img src={logo} alt="logo" style={{ height: 50, objectFit: "contain" }} />
        </Link>

        <div className="d-flex gap-4 align-items-center">
          <Link
            className={`nav-link fw-bold text-dark nav-link-hover ${isActive("/") ? "nav-link-active" : ""}`}
            to="/"
          >
            Home
          </Link>
          <Link
            className={`nav-link fw-bold text-dark nav-link-hover ${isActive("/learn") || location.pathname.startsWith("/learn") ? "nav-link-active" : ""}`}
            to="/learn"
          >
            Learning
          </Link>
          <Link
            className={`nav-link fw-bold text-dark nav-link-hover ${isActive("/dashboard") ? "nav-link-active" : ""}`}
            to="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className={`nav-link fw-bold text-dark nav-link-hover ${isActive("/progress") ? "nav-link-active" : ""}`}
            to="/progress"
          >
            Progress
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          {isLoggedIn ? (
            <>
              <div className="d-flex align-items-center gap-2 pe-3 border-end">
                <span className="small fw-bold text-dark">Hello, <span className="text-success">{userName}</span></span>
                <div
                  className="user-avatar-circle d-flex align-items-center justify-content-center fw-bold text-white cursor-pointer"
                  onClick={() => setShowProfile(!showProfile)}
                  style={{
                    width: "35px",
                    height: "35px",
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #0f2027, #203a43, #2c5364)",
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "transform 0.3s ease"
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
              </div>
              <button
                className="btn btn-outline-danger btn-sm px-3 rounded-pill fw-bold"
                onClick={handleLogout}
                style={{ fontSize: "0.8rem" }}
              >
                Logout
              </button>
            </>
          ) : (
            <Link className="btn btn-dark btn-sm px-4 rounded-pill" to="/login">
              Login
            </Link>
          )}
        </div>
      </nav>

      {/* User Information Modal - Dark Glassmorphism */}
      {showProfile && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
          style={{ zIndex: 2000, background: "rgba(0,0,0,0.6)", backdropFilter: "blur(5px)" }}
          onClick={() => setShowProfile(false)}
        >
          <div
            className="card-dark p-4 shadow-lg active-link-highlight"
            style={{ width: "350px", border: "1px solid rgba(255,255,255,0.2)", animation: "float-home 4s ease-in-out infinite" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-4">
              <div
                className="mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold text-white shadow"
                style={{ width: "80px", height: "80px", borderRadius: "50%", background: "linear-gradient(45deg, #00C9FF, #92FE9D)", fontSize: "2rem" }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
              <h4 className="fw-bold mb-0 text-white">{userName}</h4>
              <p className="text-success small mb-0 fw-bold">Verified FinGrow Member</p>
            </div>

            <div className="p-3 rounded bg-white bg-opacity-75 border border-white border-opacity-25 mb-4 px-4 text-center">
              <p className="text-dark small mb-3" style={{ fontStyle: "italic", fontWeight: "500" }}>
                "Thank you for logging in! We're honored to be part of your financial journey today."
              </p>
              <hr className="text-dark opacity-25 mb-3" />
              <div className="mb-3 text-start">
                <label className="text-dark opacity-75 small d-block mb-1 fw-bold">Username</label>
                <div className="text-dark fw-bold" style={{ fontSize: "1.1rem" }}>{userName}</div>
              </div>
              <div className="text-start">
                <label className="text-dark opacity-75 small d-block mb-1 fw-bold">Email Address</label>
                <div className="text-dark fw-bold">{user.email || "No email available"}</div>
              </div>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-sm btn-outline-light w-100 fw-bold"
                onClick={() => setShowProfile(false)}
              >
                Close
              </button>
              <button
                className="btn btn-sm btn-danger w-100 fw-bold"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
