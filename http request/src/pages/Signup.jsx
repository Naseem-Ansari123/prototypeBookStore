import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify'
import { httpRequest } from '../lib/http'

const Signup = () => {
  const model = {
    username: "",
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
    try{
      e.preventDefault();
      const { data } = await httpRequest.post("users/register",input)
      toast.success(data.message)
      setInput(model);
      setTimeout(() => {
        navigate("/login");
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
    catch(err){
      toast.error(err?.response?.data?.message || err.message);
    }
  }
   
  
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-slate-950 to-purple-500/20" />
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-cyan-500/20 blur-[120px]" />
      <div className="absolute -bottom-20 right-10 h-80 w-80 rounded-full bg-violet-500/20 blur-[140px]" />

      {/* Card */}
      <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <h1 className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent">
            Create Account
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Join us and start your journey today 🚀
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Full Name
            </label>
            <input
              required
              type="text"
              name="username"
              value={input.username}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Email
            </label>
            <input
              required
              type="email"
              name="email"
              value={input.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-slate-300">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full rounded-xl border border-slate-700 bg-slate-900/70 px-4 py-3 text-white outline-none transition focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40"
            />
          </div>

          

          <button
            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-3 font-semibold text-white transition duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/30"
          >
            Create Account
          </button>
        </form>

        <div className="my-6 flex items-center">
          <div className="h-px flex-1 bg-slate-700" />
          <span className="px-3 text-sm text-slate-400">OR</span>
          <div className="h-px flex-1 bg-slate-700" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="rounded-xl border border-slate-700 bg-slate-900 py-3 text-sm font-medium text-white transition hover:border-cyan-400 hover:bg-slate-800">
            Google
          </button>

          <button className="rounded-xl border border-slate-700 bg-slate-900 py-3 text-sm font-medium text-white transition hover:border-cyan-400 hover:bg-slate-800">
            GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            Sign In
          </Link>
        </p>
      </div>
      
    </div>
  );
}

export default Signup