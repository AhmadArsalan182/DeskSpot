import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import FormField from "../components/FormField.jsx";
import { login } from "../services/auth.js";

export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card card--narrow">
      <h1>Log in</h1>
      <p>Sign in to book a desk or meeting room.</p>
      {location.state?.registered && <Alert type="success">Account created. You can log in now.</Alert>}
      {error && <Alert>{error}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Email" name="email" type="email" autoComplete="email" required value={form.email} onChange={handleChange} />
        <FormField label="Password" name="password" type="password" autoComplete="current-password" required value={form.password} onChange={handleChange} />
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <p className="form-footer">
        No account yet? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
