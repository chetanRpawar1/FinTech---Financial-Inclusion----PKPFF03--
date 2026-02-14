import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Signup() {
  const [form, setForm] = useState({username:"",email:"",password:""});
  const [error,setError]=useState("");
  const nav=useNavigate();

  const submit=e=>{
    e.preventDefault();
    if(!form.username||!form.email||!form.password){
      setError("All fields required");
      return;
    }
    if(!form.email.includes("@")){
      setError("Invalid email");
      return;
    }
    localStorage.setItem("user",JSON.stringify(form));
    nav("/login");
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <img src={logo} style={{width:120}} />
      <form onSubmit={submit} className="card-dark mt-3" style={{width:300}}>
        <h4>Sign Up</h4>
        <input className="form-control mb-2" placeholder="Username"
          onChange={e=>setForm({...form,username:e.target.value})}/>
        <input className="form-control mb-2" placeholder="Email"
          onChange={e=>setForm({...form,email:e.target.value})}/>
        <input type="password" className="form-control mb-2" placeholder="Password"
          onChange={e=>setForm({...form,password:e.target.value})}/>
        {error && <small className="text-warning">{error}</small>}
        <button className="btn btn-success w-100 mt-2">Create Account</button>
      </form>
    </div>
  );
}
