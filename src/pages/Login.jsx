import { useEffect, useState } from "react";
import { login } from "../utils/api";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setError("");
  }, [username, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      await login({ username, password });
      navigate("/dashboard");
    } catch (e) {
      setError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 bg-white p-6 rounded shadow">
      <h2 className="font-bold text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <input
          type="email"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
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
          {loading ? "Logging in…" : "Login"}
        </button>
      </form>
      <p className="text-sm mt-3">
        No account? <Link to="/register" className="text-blue-600">Register</Link>
      </p>
    </div>
  );
}


