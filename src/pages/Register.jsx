import { useState } from "react";
import { register } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await register({ username, password });
      navigate("/login");
    } catch (e) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="font-bold text-xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="border p-2 rounded w-full"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 rounded w-full"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? "Registering…" : "Register"}
        </button>
      </form>
      <p className="text-sm mt-3">
        Have an account? <Link to="/login" className="text-blue-600">Login</Link>
      </p>
    </div>
  );
}


