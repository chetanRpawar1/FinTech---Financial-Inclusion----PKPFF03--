import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import heroImg from "../assets/landing_hero_3d_dark.png";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container d-flex align-items-center" style={{ minHeight: "calc(100vh - 70px)" }}>
                <div className="row w-100 align-items-center">

                    {/* Left Content */}
                    <div className="col-lg-6">
                        <h1 className="display-3 fw-bold mb-4" style={{ lineHeight: "1.2" }}>
                            <span style={{ color: "white" }}>Learn Smart.</span><br />
                            <span style={{
                                background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)",
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                color: "transparent"
                            }}>Save Smart.</span><br />
                            <span style={{ color: "white" }}>Grow Smart.</span>
                        </h1>

                        <p className="lead text-light opacity-75 mb-5" style={{ maxWidth: "500px" }}>
                            Empowering young adults with smart financial habits through fun, interactive learning, and easy-to-use tracking tools.
                        </p>

                        <div className="d-flex gap-3">
                            <Link to="/signup" className="btn btn-lg px-5 py-3 fw-bold btn-hover-grow"
                                style={{
                                    background: "#00e676",
                                    color: "#003300",
                                    borderRadius: "50px",
                                    border: "none",
                                    boxShadow: "0 10px 20px rgba(0, 230, 118, 0.3)"
                                }}>
                                Get Started
                            </Link>
                            <Link to="/learn" className="btn btn-lg px-5 py-3 fw-bold btn-hover-outline"
                                style={{
                                    background: "transparent",
                                    color: "white",
                                    border: "2px solid rgba(255,255,255,0.3)",
                                    borderRadius: "50px"
                                }}>
                                Let`s Learn
                            </Link>
                        </div>
                    </div>

                    {/* Right Image */}
                    <div className="col-lg-6 d-none d-lg-block text-center">
                        <img
                            src={heroImg}
                            alt="Financial Growth"
                            className="img-fluid brightness-hover"
                            style={{
                                maxHeight: "80vh",
                                borderRadius: "40px",
                                boxShadow: "0 0 60px rgba(0, 230, 118, 0.4)",
                                border: "1px solid rgba(255, 255, 255, 0.1)",
                                transform: "scale(1.1)"
                            }}
                        />
                    </div>

                </div>
            </div>
        </>
    );
}
