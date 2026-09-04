import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { httpRequest } from "../../lib/http";
import { useSession } from "../../../zustand/useSession";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { setAdmin , admin} = useSession(state=>state)

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await httpRequest.post("admins/login", value);
      // console.log(data);
      // console.log(data.admin);
      // console.log(data.token);
      setAdmin({
        admin:data.admin,
        token:data.token
      })
      toast.success(data.message || "Login successful");
      console.log(admin);
      
      

      // Navigate according to your application
      setTimeout(() => {
        navigate("/admin/admindashboard");
      }, 2000);

    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">

      {/* Background glow */}
      <div className="pointer-events-none fixed left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">

        {/* Login Card */}
        <div className="w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl">

          <div className="bg-white p-6 sm:p-10">

            {/* Logo */}
            <div className="mb-10 flex items-center justify-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-xl shadow-lg">
                📚
              </div>

              <div>
                <h1 className="text-xl font-bold text-slate-900">
                  Book<span className="text-emerald-600">Hub</span>
                </h1>

                <p className="text-xs text-slate-400">
                  Seller Center
                </p>
              </div>

            </div>


            {/* Heading */}
            <div className="mb-8 text-center">

              <p className="mb-2 text-sm font-semibold text-emerald-600">
                SELLER LOGIN
              </p>

              <h2 className="text-3xl font-black tracking-tight text-slate-900">
                Welcome back 👋
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Login to manage your store and start selling.
              </p>

            </div>


            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    ✉️
                  </span>

                  <input
                    type="email"
                    name="email"
                    value={value.email}
                    onChange={handleChange}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                </div>

              </div>


              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label className="text-sm font-semibold text-slate-700">
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="text-xs font-semibold text-emerald-600 hover:underline"
                  >
                    Forgot password?
                  </Link>

                </div>

                <div className="relative">

                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                    🔒
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={value.password}
                    onChange={handleChange}
                    required
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-12 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400 transition hover:text-slate-700"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>

                </div>

              </div>


              {/* Remember Me */}
              <div className="flex items-center justify-between">

                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">

                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />

                  Remember me

                </label>

              </div>


              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login to Seller Center

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </>
                )}

              </button>

            </form>


            {/* Signup */}
            <p className="mt-7 text-center text-sm text-slate-500">

              Don't have a seller account?{" "}

              <Link
                to="/admin-signup"
                className="font-bold text-emerald-600 hover:underline"
              >
                Create account
              </Link>

            </p>


            {/* Security */}
            <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>🔒</span>
              Your information is securely protected
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminLogin;