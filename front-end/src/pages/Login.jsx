import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="login">
      
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2><br />
        <input name="email" onChange={handleChange} placeholder="Email" className="input" />
        
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="input" />
        <br />
        <button className="btn">Login</button>
        <br /><br />

        <Link to="/register">Don't have a account? Register</Link>
      </form>
    </div>
  );
};

export default Login;
