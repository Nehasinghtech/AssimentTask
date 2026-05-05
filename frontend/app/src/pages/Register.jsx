import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/signup", { email, password });
      navigate("/");
    } catch (err) {
      const msg =
        err?.response?.data?.msg ||
        (err?.code === "ERR_NETWORK"
          ? "Backend server is not running on port 5000."
          : "Signup failed.");
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap register-bg">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Sign up and your DSA sheet will be ready instantly.</p>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button onClick={handleRegister} disabled={loading}>
          {loading ? "Creating..." : "Sign Up"}
        </button>
        <p>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
