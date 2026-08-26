import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react';
import { httpRequest } from '../../lib/http';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {
  const model = {
    storeName: "",
    ownerName: "",
    email: "",
    phoneNo: "",
    password: ""
  }
  const navigate = useNavigate();
  const [step, setStep] = useState(2);
  const [value, setValue] = useState(model)

  const handleChnage = (e) => {
    const name = e.target.name;
    const val = e.target.value;
    setValue({
      ...value,
      [name]: val
    })
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await httpRequest.post("admins/register", value)
      toast.success(data.message)
      setTimeout(() => {
        // navigate("/admin-login");
        setStep(step + 1)
      }, 2000);
    }
    catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    }

  }
  return (
    <>
      <div className="min-h-screen bg-slate-950 px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-7xl items-center justify-center">

          <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

            {/* ================= LEFT SIDE ================= */}
            <div className="relative hidden overflow-hidden p-10 lg:flex lg:flex-col lg:justify-between xl:p-14">

              {/* Glow Effects */}
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

              <div className="relative z-10">

                {/* Logo */}
                <div className="mb-14 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 text-xl shadow-lg">
                    📚
                  </div>

                  <div>
                    <h1 className="text-xl font-bold text-white">
                      Book<span className="text-emerald-400">Hub</span>
                    </h1>

                    <p className="text-xs text-slate-400">
                      Seller Center
                    </p>
                  </div>

                </div>


                {/* Step Information */}
                <div>

                  <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-semibold text-cyan-300">
                    STEP {step} OF 3
                  </span>

                  <h2 className="mt-6 max-w-lg text-4xl font-black leading-tight text-white xl:text-5xl">
                    Build your
                    <span className="block bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                      online store.
                    </span>
                  </h2>

                  <p className="mt-5 max-w-md text-sm leading-6 text-slate-400">
                    Tell customers what makes your store special.
                    Add your store information and create your
                    professional seller profile.
                  </p>

                </div>


                {/* Progress Steps */}
                <div className="mt-12 space-y-6">

                  {/* Step 1 */}
                  <div className="flex items-center gap-4">

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-cyan-400 text-sm font-bold text-white">
                      {(step == 2 || step == 3) ? "✓" : "1"}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Create Account
                      </p>

                      <p className="text-xs text-slate-500">
                        Account credentials completed
                      </p>
                    </div>

                  </div>


                  {/* Connecting line */}
                  {/* <div className="ml-5 h-8 w-px bg-gradient-to-b from-emerald-400 to-cyan-400" /> */}
                  <div className={`ml-5 h-8 w-px ${(step == 2 || step == 3) ? "bg-gradient-to-b from-emerald-400 to-cyan-400" : "bg-white/10"}`} />


                  {/* Step 2 */}
                  <div className="flex items-center gap-4">

                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 ${(step == 1) ? "bg-white/5" : "bg-gradient-to-b from-emerald-400 to-cyan-400 text-white"} text-sm font-bold text-slate-500 `}>
                      {(step == 3) ? "✓" : "2"}
                    </div>

                    <div>
                      <p className={`text-sm font-semibold ${(step == 1) ? "text-slate-500" : "text-white"}`}>
                        Set Up Store
                      </p>

                      <p className="text-xs text-slate-500">
                        Add your store information
                      </p>
                    </div>

                  </div>


                  {/* Connecting line */}
                  <div className={`ml-5 h-8 w-px ${(step == 3) ? "bg-gradient-to-b from-emerald-400 to-cyan-400" : "bg-white/10"}`} />


                  {/* Step 3 */}
                  <div className="flex items-center gap-4">

                    <div className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/10 ${(step == 1 || step == 2) ? "bg-white/5" : "bg-gradient-to-b from-emerald-400 to-cyan-400 text-white"} text-sm font-bold text-slate-500`}>
                      3
                    </div>

                    <div>
                      <p className={`text-sm font-semibold ${(step == 1 || step == 2) ? "text-slate-500" : "text-white"}`}>
                        Login
                      </p>

                      <p className="text-xs text-slate-600">
                        Enter correct email, password
                      </p>
                    </div>

                  </div>

                </div>

              </div>


              {/* Bottom */}
              <div className="relative z-10 mt-10 flex items-center gap-2 text-xs text-slate-500">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Your store information can be updated anytime
              </div>

            </div>



            {/* ================= RIGHT SIDE ================= */}
            {step == 1 &&
              <div className="relative bg-white p-6 sm:p-10 lg:p-12">

                <div className="mx-auto max-w-md">

                  {/* Mobile Logo */}
                  <div className="mb-8 flex items-center gap-3 lg:hidden">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg">
                      📚
                    </div>

                    <div>
                      <h1 className="font-bold text-slate-900">
                        Book<span className="text-emerald-600">Hub</span>
                      </h1>

                      <p className="text-xs text-slate-400">
                        Seller Center
                      </p>
                    </div>
                  </div>


                  {/* Heading */}
                  <div className="mb-8">
                    <p className="mb-2 text-sm font-semibold text-emerald-600">
                      SELLER REGISTRATION
                    </p>

                    <h2 className="text-3xl font-black tracking-tight text-slate-900">
                      Create your seller account
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Start selling your books in just a few minutes.
                    </p>
                  </div>


                  {/* Progress */}
                  <div className="mb-8">
                    <div className="mb-2 flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-700">
                        Getting started
                      </span>

                      <span className="text-slate-400">
                        Step 1 of 3
                      </span>
                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-0 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    </div>
                  </div>


                  {/* Form */}
                  <form className="space-y-5" onSubmit={handleSubmit}>

                    {/* Store Name */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Store name
                      </label>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                          🏪
                        </span>

                        <input
                          type="text"
                          required
                          value={value.storeName}
                          onChange={handleChnage}
                          name='storeName'
                          placeholder="Enter your store name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        />
                      </div>
                    </div>


                    {/* Owner Name */}
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Owner name
                      </label>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                          👤
                        </span>

                        <input
                          type="text"
                          required
                          value={value.ownerName}
                          onChange={handleChnage}
                          name='ownerName'
                          placeholder="Enter owner's full name"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        />
                      </div>
                    </div>


                    {/* Email + Phone */}
                    <div className="grid gap-5 sm:grid-cols-2">

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Email
                        </label>

                        <input
                          type="email"
                          required
                          value={value.email}
                          onChange={handleChnage}
                          name='email'
                          placeholder="you@example.com"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Phone
                        </label>

                        <input
                          type="tel"
                          required
                          value={value.phoneNo}
                          onChange={handleChnage}
                          name='phoneNo'
                          placeholder="+91 98765 43210"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        />
                      </div>

                    </div>


                    {/* Password */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="text-sm font-semibold text-slate-700">
                          Password
                        </label>

                        <span className="text-xs text-slate-400">
                          Min. 8 characters
                        </span>
                      </div>

                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                          🔒
                        </span>

                        <input
                          type="password"
                          required
                          value={value.password}
                          onChange={handleChnage}
                          name='password'
                          placeholder="Create a strong password"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                        />
                      </div>
                    </div>


                    {/* Terms */}
                    <label className="flex cursor-pointer items-start gap-3 text-xs leading-5 text-slate-500">
                      <input
                        type="checkbox"
                        required
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />

                      <span>
                        I agree to the{" "}
                        <button
                          type="button"
                          className="font-semibold text-emerald-600 hover:underline"
                        >
                          Seller Terms
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="font-semibold text-emerald-600 hover:underline"
                        >
                          Privacy Policy
                        </button>
                        .
                      </span>
                    </label>


                    {/* Submit */}
                    <button
                      type="submit"
                      className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]"
                    >
                      Create Seller Account

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </button>

                  </form>
                  {
                    JSON.stringify(value)
                  }


                  {/* Login */}
                  <p className="mt-7 text-center text-sm text-slate-500">
                    Already have a seller account?{" "}
                    <button >
                      <Link
                        to="/admin-login"
                        className="font-bold text-emerald-600 hover:underline"
                      >
                        Login
                      </Link>
                    </button>
                  </p>


                  {/* Security */}
                  <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <span>🔒</span>
                    Your information is securely protected
                  </div>

                </div>
              </div>
            }

            {
              step == 2 &&
              <div className="relative bg-white p-6 sm:p-10 lg:p-12">

                <div className="mx-auto max-w-xl">

                  {/* Mobile Logo */}
                  <div className="mb-8 flex items-center gap-3 lg:hidden">

                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 text-lg">
                      📚
                    </div>

                    <div>
                      <h1 className="font-bold text-slate-900">
                        Book<span className="text-emerald-600">Hub</span>
                      </h1>

                      <p className="text-xs text-slate-400">
                        Seller Center
                      </p>
                    </div>

                  </div>


                  {/* Header */}
                  <div className="mb-8">

                    <div className="mb-4 flex items-center justify-between">

                      <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                        STEP {step} OF 3
                      </span>

                      <span className="text-xs font-medium text-slate-400">
                        50% completed
                      </span>

                    </div>

                    <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full w-2/3 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                    </div>


                    <h2 className="text-3xl font-black tracking-tight text-slate-900">
                      Set up your store
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Add a few details so customers can discover and trust your store.
                    </p>

                  </div>


                  {/* ================= STORE LOGO ================= */}
                  <div className="mb-7">

                    <label className="mb-3 block text-sm font-semibold text-slate-700">
                      Store logo
                    </label>

                    <div className="flex items-center gap-4">

                      <div
                        className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 text-3xl transition hover:border-emerald-400 hover:bg-emerald-50">
                        📷
                      </div>

                      <div>

                        <button type="button"
                          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-400 hover:text-emerald-600">
                          Upload Logo
                        </button>

                        <p className="mt-2 text-xs text-slate-400">
                          PNG, JPG or WEBP · Max 2MB
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* ================= FORM ================= */}
                  <form className="space-y-5">

                    {/* Store Name */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Store name
                      </label>

                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                          🏪
                        </span>

                        <input type="text" placeholder="e.g. Naseem Book House"
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />

                      </div>

                    </div>


                    {/* Category */}
                    <div>

                      <label className="mb-2 block text-sm font-semibold text-slate-700">
                        Store category
                      </label>

                      <div className="relative">

                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">
                          📚
                        </span>

                        <select
                          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-10 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                          defaultValue="">
                          <option value="" disabled>
                            Select a category
                          </option>

                          <option>Books & Literature</option>
                          <option>Academic Books</option>
                          <option>Programming & Technology</option>
                          <option>Comics & Manga</option>
                          <option>Children's Books</option>
                          <option>Stationery</option>
                          <option>Other</option>
                        </select>

                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                          ▼
                        </span>

                      </div>

                    </div>


                    {/* Description */}
                    <div>

                      <div className="mb-2 flex items-center justify-between">

                        <label className="text-sm font-semibold text-slate-700">
                          Store description
                        </label>

                        <span className="text-xs text-slate-400">
                          0 / 200
                        </span>

                      </div>

                      <textarea rows="4" maxLength="200" placeholder="Tell customers what your store offers..."
                        className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />

                    </div>


                    {/* Location Heading */}
                    <div className="border-t border-slate-100 pt-5">

                      <div className="mb-4">

                        <h3 className="font-bold text-slate-900">
                          Store location
                        </h3>

                        <p className="mt-1 text-xs text-slate-400">
                          Where customers can find your business
                        </p>

                      </div>


                      {/* Address */}
                      <div className="mb-5">

                        <label className="mb-2 block text-sm font-semibold text-slate-700">
                          Address
                        </label>

                        <div className="relative">

                          <span className="absolute left-4 top-4 text-lg">
                            📍
                          </span>

                          <textarea rows="2" placeholder="Enter your complete store address"
                            className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />

                        </div>

                      </div>


                      {/* City / State / Pincode */}
                      <div className="grid gap-4 sm:grid-cols-3">

                        <div>

                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            City
                          </label>

                          <input type="text" placeholder="Mumbai"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />

                        </div>


                        <div>

                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            State
                          </label>

                          <input type="text" placeholder="Maharashtra"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />

                        </div>


                        <div>

                          <label className="mb-2 block text-sm font-semibold text-slate-700">
                            Pincode
                          </label>

                          <input type="text" placeholder="400001" maxLength="6"
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10" />

                        </div>

                      </div>

                    </div>


                    {/* Buttons */}
                    <div className="flex flex-col-reverse gap-3 pt-4 sm:flex-row sm:justify-between">

                      <button type="button"
                      onClick={()=>setStep(step - 1)}
                        className="rounded-xl border border-slate-200 px-6 py-3.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">
                        ← Back
                      </button>

                      <button type="submit"
                        className="group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98]">
                        Save & Continue

                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>

                      </button>

                    </div>

                  </form>


                  {/* Security */}
                  <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400">
                    <span>🔒</span>
                    Your store information is securely protected
                  </div>

                </div>

              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminSignup
