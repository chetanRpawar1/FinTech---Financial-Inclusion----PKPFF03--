import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = !!localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userName = user.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
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
                className="user-avatar-circle d-flex align-items-center justify-content-center fw-bold text-white"
                style={{ width: "35px", height: "35px", borderRadius: "50%", background: "linear-gradient(45deg, #0f2027, #203a43, #2c5364)", fontSize: "0.9rem" }}
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
  );
}
