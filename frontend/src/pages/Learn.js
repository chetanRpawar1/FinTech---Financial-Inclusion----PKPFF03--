import Navbar from "../components/Navbar";
import LearningNav from "../components/LearningNav";
import { Link } from "react-router-dom";
import creditImg from "../assets/credit_card.png";
import budgetImg from "../assets/budget.png";
import savingImg from "../assets/saving.png";
import investingImg from "../assets/investing.png";

export default function Learn() {
  const totalCredit = localStorage.getItem("userTotalCredit") || 0;

  const modules = [
    {
      title: "Credit",
      description: "Master your credit score, manage debt, and build a strong financial reputation.",
      link: "/learn/credit",
      img: creditImg,
      bg: "#ffe8e8",
      color: "#d63384",
      btnColor: "#d63384"
    },
    {
      title: "Budget Basics",
      description: "Learn the 50/30/20 rule and take control of your monthly expenses.",
      link: "/learn/budget",
      img: budgetImg,
      bg: "#e0f7fa",
      color: "#00838f",
      btnColor: "#006064"
    },
    {
      title: "Saving",
      description: "Discover the power of compound interest and build your emergency fund.",
      link: "/learn/saving",
      img: savingImg,
      bg: "#fff9c4",
      color: "#fbc02d",
      btnColor: "#f57f17"
    },
    {
      title: "Investing",
      description: "Grow your wealth with smart investment strategies for long-term freedom.",
      link: "/learn/investing",
      img: investingImg,
      bg: "#e1bee7",
      color: "#8e24aa",
      btnColor: "#6a1b9a"
    }
  ];

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <LearningNav />
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold text-white">Learning Modules</h2>
          {Number(totalCredit) > 0 && (
            <span className="badge bg-danger fs-6 px-3 py-2 rounded-pill">Total Credit: Rs. {Number(totalCredit).toLocaleString()}</span>
          )}
        </div>

        <div className="row g-4">
          {modules.map((m) => (
            <div className="col-md-3" key={m.title}>
              <Link to={m.link} className="text-decoration-none">
                <div
                  className="card h-100 border-0 transition-hover"
                  style={{
                    background: m.bg,
                    borderRadius: "24px",
                    transition: "transform 0.2s",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ height: "50%", width: "100%", position: "relative" }}>
                    <img
                      src={m.img}
                      alt={m.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
                      }}
                    />
                  </div>

                  <div className="p-4 d-flex flex-column" style={{ height: "50%" }}>
                    <h4 className="fw-bold mb-2" style={{ color: "black" }}>{m.title}</h4>
                    <p className="small mb-4" style={{ color: "#555", lineHeight: "1.5" }}>{m.description}</p>

                    <div className="mt-auto fw-bold d-flex align-items-center" style={{ color: m.btnColor }}>
                      Start Now <span className="ms-2">→</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
