import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://project-management-backend-9.onrender.com", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
      <form onSubmit={handleLogin} className="p-6 bg-white shadow rounded w-96 space-y-4">
        <h2 className="text-xl font-bold text-indigo-700">Login</h2>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="Email" className="w-full border p-2 rounded" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="Password" className="w-full border p-2 rounded" />
        <button className="w-full bg-indigo-600 text-white py-2 rounded">Login</button>
        <p className="text-sm">Don't have an account? <Link to="/register" className="text-indigo-600">Register</Link></p>
      </form>
    </div>
  );
}

export default Login;