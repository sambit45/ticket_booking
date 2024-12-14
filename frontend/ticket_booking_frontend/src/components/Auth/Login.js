import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8002/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
   
    
    if (response.ok) {
      const data = await response.json();
      const token = data.token;

      localStorage.setItem("authToken", token);

      navigate("/");
    } else {
      const errorData = await response.json();
      setError(errorData.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-purple-400 flex items-center justify-center p-4">
      <div className="bg-black w-full max-w-md p-8 rounded-lg shadow-lg">
        <h1 className="text-white text-2xl font-bold mb-4">Login</h1>
        <div className="text-white mb-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-purple-500 hover:text-purple-400">
            Register
          </Link>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
