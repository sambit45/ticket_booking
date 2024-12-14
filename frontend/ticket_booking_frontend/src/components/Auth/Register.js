import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));

    if (id === "email") {
      validateEmail(value);
    } else if (id === "password") {
      validatePassword(value);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 75) {
      setError("Password must be between 8 and 10 characters long");
    } else {
      setError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (error) {
      return;
    }

    const response = await fetch("http://localhost:8002/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      navigate("/login");
    } else {
      const data = await response.json();
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-purple-400 flex items-center justify-center p-4">
      <div className="bg-black w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-4">Create an account</h1>
        <div className="text-white mb-4">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-500 hover:text-purple-400">
            Login
          </Link>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="fullname">
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
