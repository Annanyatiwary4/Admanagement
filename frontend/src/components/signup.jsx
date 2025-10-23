import { useState } from "react";
import { adminSignup } from "../api/Api";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header"; // optional if you want header

function Signup({ ads = [] }) {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminSignup(form);
      if (res.data.success) {
        navigate("/admin");
      } else {
        setMessage(res.data.message);
      }
    } catch (err) {
      setMessage("Error signing up");
    }
  };

  return (
    <div>
      {/* Header at top (optional) */}
      <Header ads={ads} />

      <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-r from-blue-100 to-white mt-4">
        {/* Left Column */}
        <div className="md:w-1/2 flex flex-col justify-center p-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
            Powerful Tools for Modern Workflows
          </h1>
          <p className="text-lg md:text-xl text-black mb-6">
            Join thousands of users who trust TheToolX for their daily productivity needs. From video downloading to file conversion, we've got you covered.
          </p>

          <ul className="flex space-x-6 text-black text-sm md:text-base">
            <li className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 inline-block mr-2"></span>
              Free forever plan
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 inline-block mr-2"></span>
              Premium features available
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 inline-block mr-2"></span>
              Secure & private
            </li>
          </ul>
        </div>

        {/* Right Column - Signup Card */}
        <div className="md:w-1/2 flex items-center justify-center p-10">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
              Create an Account
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Sign up to access your dashboard and tools
            </p>

            {/* Google Sign-Up */}
            <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-black font-semibold py-2 px-4 rounded-lg mb-4 transition hover:bg-gray-100">
              Continue with Google
            </button>

            <div className="flex items-center my-4">
              <hr className="flex-1 border-gray-300" />
              <span className="px-2 text-gray-400 text-sm">or</span>
              <hr className="flex-1 border-gray-300" />
            </div>

            {/* Signup Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
              >
                Sign Up
              </button>
            </form>

            {message && (
              <p className="mt-4 text-center text-sm text-red-500">{message}</p>
            )}

            <p className="text-center text-gray-500 text-sm mt-4">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-500 hover:underline font-semibold"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
