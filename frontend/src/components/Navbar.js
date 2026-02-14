import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav
      className="navbar px-3 shadow-sm"
      style={{ background: "#ffffff" }}
    >
      <img src={logo} alt="logo" style={{ height: 100 , width:150}} />

      <div className="d-flex gap-4">
        <Link className="nav-link fw-semibold text-dark" to="/dashboard">
          Dashboard
        </Link>

        <Link className="nav-link fw-semibold text-dark" to="/learn">
          Learning
        </Link>
      </div>
    </nav>
  );
}
