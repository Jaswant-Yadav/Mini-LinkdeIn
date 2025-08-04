import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("Register Sucessfully...")
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 >Register</h2><br />
        <input name="name" onChange={handleChange} placeholder="Name" className="input" />
        <br />
        <input name="email" onChange={handleChange} placeholder="Email" className="input" />
        <br />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" className="input" />
        <br />
        <button className="btn">Register</button>
        <br /><br />
        <Link to="/login">Already have a account? Login</Link>
      </form>
    </div>
  );
};

export default Register;
