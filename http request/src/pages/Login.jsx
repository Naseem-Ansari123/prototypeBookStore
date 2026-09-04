import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import { httpRequest } from "../lib/http";
import { useSession } from "../../zustand/useSession";

const Login = () => {
  const {setUser} = useSession(state=>state)
  const model = {
    email: "",
    password: ""
  }
  const [input, setInput] = useState(model)
  const navigate = useNavigate();

  const handleChange = (e) => {
    const data = e.target;
    const name = data.name
    const value = data.value
    console.log(data);
    console.log(name);
    // console.log(value);

    setInput({ ...input, [name]: value })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await httpRequest.post("users/login", input)
      console.log(data.user);
      setUser({
        user: data.user,
        token: data.token
      })
      setInput(model)
      toast.success(data.message)
      setTimeout(() => {
        navigate("/");
      }, 2000);
      
      //   fetch(uri, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(input)
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     setInput(model)
      //     toast.success("Signup Sucessfully!")
      //     console.log(data);
      //     console.log(data.oK);
      //     console.log(data.message);

      //     setTimeout(() => {
      //       if (data.oK) {
      //         navigate("/login");
      //       }
      //     }, 3000);
      //   })
      //   .catch((err)=> toast(err))
    }
    catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }
  }
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-slate-950 to-violet-500/20" />
      <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-violet-500/20 blur-[140px]" />

      {/* Login Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            Welcome Back
          </h1>
          <p className="mt-3 text-slate-400">
            Login to continue your journey 🚀
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={input.email}
              placeholder="Enter your email"
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm text-slate-300">
                Password
              </label>

              <Link
                to="/forgot-password"
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                Forgot Password?
              </Link>
            </div>

            <input
              type="password"
              name="password"
              value={input.password}
              placeholder="Enter your password"
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          {/* Remember Me */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex cursor-pointer items-center gap-2 text-slate-400">
              <input
                type="checkbox"
                className="h-4 w-4 accent-cyan-500"
              />
              Remember me
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="px-3 text-sm text-slate-500">OR</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-4">
          <button className="rounded-xl border border-slate-700 bg-slate-900 py-3 font-medium text-white transition hover:border-cyan-400 hover:bg-slate-800">
            Google
          </button>

          <button className="rounded-xl border border-slate-700 bg-slate-900 py-3 font-medium text-white transition hover:border-cyan-400 hover:bg-slate-800">
            GitHub
          </button>
        </div>

        {/* Bottom */}
        <p className="mt-8 text-center text-sm text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-semibold text-cyan-400 hover:text-cyan-300"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login