// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
// export default function App() {
//   return <h1>FinGrow App</h1>;
// }
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Learn from "./pages/Learn";
import BudgetLearning from "./pages/BudgetLearning";
import SavingLearning from "./pages/SavingLearning";
import InvestingLearning from "./pages/InvestingLearning";
import CreditLearning from "./pages/CreditLearning";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/budget" element={<BudgetLearning />} />
        <Route path="/learn/saving" element={<SavingLearning />} />
        <Route path="/learn/investing" element={<InvestingLearning />} />
        <Route path="/learn/credit" element={<CreditLearning />} />
      </Routes>
    </BrowserRouter>
  );
}


