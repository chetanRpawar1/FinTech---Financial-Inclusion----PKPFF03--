import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const nav=useNavigate();

  const submit=e=>{
    e.preventDefault();
    const user=JSON.parse(localStorage.getItem("user"));
    if(!user||user.email!==email||user.password!==password){
      setError("Invalid credentials");
      return;
    }
    nav("/dashboard");
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <img src={logo} style={{width:120}} />
      <form onSubmit={submit} className="card-dark mt-3" style={{width:300}}>
        <h4>Login</h4>
        <input className="form-control mb-2" placeholder="Email"
          onChange={e=>setEmail(e.target.value)}/>
        <input type="password" className="form-control mb-2" placeholder="Password"
          onChange={e=>setPassword(e.target.value)}/>
        {error && <small className="text-warning">{error}</small>}
        <button className="btn btn-primary w-100 mt-2">Login</button>
      </form>
    </div>
  );
}
