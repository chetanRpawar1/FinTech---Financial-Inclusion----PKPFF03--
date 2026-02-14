import { Link, useLocation } from "react-router-dom";

export default function LearningNav() {
    const location = useLocation();

    const navItems = [
        { name: "Overview", path: "/learn" },
        { name: "Credit", path: "/learn/credit" },
        { name: "Budgeting", path: "/learn/budget" },
        { name: "Saving", path: "/learn/saving" },
        { name: "Investing", path: "/learn/investing" }
    ];

    return (
        <div className="d-flex flex-wrap gap-2 mb-4 p-2 glass-panel" style={{ borderRadius: "12px" }}>
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                    <Link
                        key={item.path}
                        to={item.path}
                        className={`btn btn-sm px-3 rounded-pill transition-all ${isActive
                            ? "btn-success fw-bold"
                            : "btn-outline-light border-0 opacity-75"
                            }`}
                        style={{
                            fontSize: "0.85rem",
                            background: isActive ? "#00e676" : "transparent",
                            color: isActive ? "#003300" : "white",
                            transition: "all 0.3s ease"
                        }}
                    >
                        {item.name}
                    </Link>
                );
            })}
        </div>
    );
}
