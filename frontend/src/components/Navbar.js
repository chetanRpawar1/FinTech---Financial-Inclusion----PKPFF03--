import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav
      className="navbar px-4 shadow-sm"
      style={{ background: "#ffffff", borderRadius: "0 0 20px 20px", zIndex: 1000 }}
    >
      <Link to="/">
        <img src={logo} alt="logo" style={{ height: 60, objectFit: "contain" }} />
      </Link>

      <div className="d-flex gap-4 align-items-center">
        <Link className="nav-link fw-bold text-dark nav-link-hover" to="/">
          Home
        </Link>
        <Link className="nav-link fw-bold text-dark nav-link-hover" to="/dashboard">
          Dashboard
        </Link>
        <Link className="nav-link fw-bold text-dark nav-link-hover" to="/learn">
          Learning
        </Link>
        {isLoggedIn ? (
          <button
            className="btn btn-outline-danger btn-sm px-4 rounded-pill fw-bold"
            onClick={handleLogout}
          >
            Logout
          </button>
        ) : (
          <Link className="btn btn-dark btn-sm px-4 rounded-pill" to="/login">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
