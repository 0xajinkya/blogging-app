import "./Register.css";
import { useState } from "react";
import axios from "axios";
export const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const onClick = () => {
    window.location.replace("/login")
  }
  const handleSubmit = async (e) => {
        setError(false);
        try {
          e.preventDefault();
          const res = await axios.post("http://localhost:5000/api/auth/register", {
          username,
          email,
          password,
        });
        res.data && window.location.replace("/login");
        } catch (error) {
          setError(true);
        }
        
  }
  return (
    <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
            <label>Name</label>
            <input className="registerInput" type="name" placeholder="Enter Your Name" onChange={e=>setName(e.target.value)}/>
            <label>User-Name</label>
            <input className="registerInput" type="name" placeholder="Enter User-Name" onChange={e=>setUsername(e.target.value)}/>
            <label>Email</label>
            <input className="registerInput" type="email" placeholder="Enter Your Email" onChange={e=>setEmail(e.target.value)}/>
            <label>Password</label>
            <input className="registerInput" type="password" placeholder="Enter Your Password" onChange={e=>setPassword(e.target.value)}/>
            <button className="registerButton" type="submit">Register</button>
        </form>
        <button className="loginButton" onClick={onClick}>Login</button>
        {error && <span style={{color: "red", marginTop: "10px"}}>Something Went Wrong</span>}
    </div>
  )
}
