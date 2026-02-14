import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import heroImg from "../assets/landing_hero_3d_dark.png";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 70px)", overflow: "hidden" }}>

                <div className="text-center mb-5 mt-4">
                    <h1 className="display-4 fw-bold mb-2">
                        <span style={{ color: "white" }}>FinGrow:</span>
                        <span style={{
                            background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            marginLeft: "10px"
                        }}>Your Financial Portal</span>
                    </h1>
                    <p className="lead text-light opacity-50">Master your money through the power of interactive learning and tracking.</p>
                </div>

                <div className="home-orbit-container">
                    {/* Central Hero Circle */}
                    <img
                        src={heroImg}
                        alt="Financial Portal"
                        className="home-hero-circle-v2"
                    />

                    {/* Orbit Track */}
                    <div className="orbit-track">
                        <Link to="/" className="orbit-item pos-1">
                            <i className="bi bi-house-door-fill"></i>
                            <span>Home</span>
                        </Link>

                        <Link to="/learn" className="orbit-item pos-2">
                            <i className="bi bi-book-half"></i>
                            <span>Learn</span>
                        </Link>

                        <Link to="/dashboard" className="orbit-item pos-3">
                            <i className="bi bi-speedometer2"></i>
                            <span>Dashboard</span>
                        </Link>

                        <Link to="/progress" className="orbit-item pos-4">
                            <i className="bi bi-graph-up-arrow"></i>
                            <span>Progress</span>
                        </Link>

                        <Link to="/signup" className="orbit-item pos-5">
                            <i className="bi bi-person-plus-fill"></i>
                            <span>Join Us</span>
                        </Link>

                        <div className="orbit-item pos-6" style={{ cursor: "default" }}>
                            <i className="bi bi-shield-check"></i>
                            <span>FinGrow</span>
                        </div>
                    </div>
                </div>

                <div className="launch-btn-container">
                    <Link to="/login" className="btn btn-lg px-5 py-3 fw-bold btn-hover-grow"
                        style={{
                            background: "#00e676",
                            color: "#003300",
                            borderRadius: "50px",
                            border: "none",
                            boxShadow: "0 10px 20px rgba(0, 230, 118, 0.3)"
                        }}>
                        Launch Application
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
