import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "../components/Alert.jsx";
import FormField from "../components/FormField.jsx";
import { register } from "../services/auth.js";

function validate({ fullName, email, password }) {
  const errors = {};
  if (!fullName.trim()) errors.fullName = "Enter your full name.";
  if (!/^\S+@\S+\.\S+$/.test(email)) errors.email = "Enter a valid email address.";
  if (password.length < 8) errors.password = "Password must be at least 8 characters.";
  return errors;
}

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [fieldErrors, setFieldErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    try {
      await register(form);
      navigate("/login", { state: { registered: true } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="card card--narrow">
      <h1>Create account</h1>
      <p>Register with your work email to start booking spaces.</p>
      {error && <Alert>{error}</Alert>}
      <form onSubmit={handleSubmit} noValidate>
        <FormField label="Full name" name="fullName" autoComplete="name" value={form.fullName} onChange={handleChange} error={fieldErrors.fullName} />
        <FormField label="Email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} error={fieldErrors.email} />
        <FormField label="Password" name="password" type="password" autoComplete="new-password" hint="At least 8 characters." value={form.password} onChange={handleChange} error={fieldErrors.password} />
        <button className="button" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </button>
      </form>
      <p className="form-footer">
        Already registered? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}
