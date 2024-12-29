import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../context/AuthContext";

interface LoginFormProps {
  onSuccess?: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      setAuth(response.user, response.token);
      if (onSuccess) onSuccess();
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Left side - Content */}
      <div className="flex w-full bg-blue-600 p-6 md:w-1/2 md:p-12 lg:px-20 xl:px-24">
        <div className="m-auto max-w-sm lg:w-96">
          <div className="text-center text-white md:text-left">
            <h1 className="text-2xl font-extrabold md:text-3xl lg:text-4xl">
              VSLA System
            </h1>
            <p className="mt-2 text-sm md:text-base">
              Village Savings and Loan Association Management System
            </p>
          </div>
          <div className="mt-8 flex justify-center md:justify-start">
            <img
              src="/vsla-logo.png"
              alt="VSLA Logo"
              className="h-12 w-auto md:h-16"
            />
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex flex-1 px-6 py-8 md:px-12 lg:px-20 xl:px-24">
        <div className="m-auto w-full max-w-sm">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={handleChange}
                    className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
