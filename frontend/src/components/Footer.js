import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="mt-5 py-5 glass-panel" style={{ borderRadius: "20px 20px 0 0", background: "rgba(255, 255, 255, 0.05)", borderTop: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-4">
                        <h4 className="fw-bold mb-3" style={{ background: "linear-gradient(90deg, #00C9FF 0%, #92FE9D 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>FinGrow</h4>
                        <p className="text-light opacity-50 small" style={{ lineHeight: "1.8" }}>
                            Empowering your financial journey with smart tools and accessible learning.
                            FinGrow is your partner in building lasting wealth and financial inclusion for all.
                        </p>
                    </div>
                    <div className="col-lg-2 offset-lg-1">
                        <h6 className="fw-bold text-white mb-3">Company</h6>
                        <ul className="list-unstyled opacity-75 small">
                            <li className="mb-2"><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li className="mb-2"><Link to="/learn" className="text-white text-decoration-none">Learning</Link></li>
                            <li className="mb-2"><Link to="/dashboard" className="text-white text-decoration-none">Dashboard</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-2">
                        <h6 className="fw-bold text-white mb-3">Support</h6>
                        <ul className="list-unstyled opacity-75 small">
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Help Center</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Privacy Policy</a></li>
                            <li className="mb-2"><a href="#" className="text-white text-decoration-none">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="col-lg-3">
                        <h6 className="fw-bold text-white mb-3">Connect With Us</h6>
                        <div className="d-flex gap-3">
                            <a href="#" className="text-white opacity-50 hover-opacity-100 fs-5"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-white opacity-50 hover-opacity-100 fs-5"><i className="bi bi-github"></i></a>
                            <a href="#" className="text-white opacity-50 hover-opacity-100 fs-5"><i className="bi bi-linkedin"></i></a>
                        </div>
                        <p className="mt-4 text-light opacity-50 x-small">© 2026 FinGrow. All rights reserved.</p>
                    </div>
                </div>
            </div>
            <style jsx>{`
                .hover-opacity-100:hover { opacity: 1 !important; transform: translateY(-2px); transition: all 0.3s; }
                .x-small { font-size: 0.7rem; }
            `}</style>
        </footer>
    );
}
