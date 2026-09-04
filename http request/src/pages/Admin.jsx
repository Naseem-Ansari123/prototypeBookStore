import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    BookOpen,
    ShieldCheck,
    BarChart3,
    ShoppingCart,
    Star,
    Users,
    PlusCircle,
    Settings,
    TrendingUp,
    Package,
    Eye,
    CheckCircle2,
    ArrowRight,
    Sparkles,
    LockKeyhole,
    BadgeCheck,
    CircleHelp,
    ChevronDown,
    Menu,
    X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    const [openFaq, setOpenFaq] = useState(null);
    const [mobileMenu, setMobileMenu] = useState(false);
    const navigate = useNavigate();

    const features = [
        {
            icon: PlusCircle,
            title: "Add Your Books",
            description:
                "Upload your books with title, price, category, cover image and detailed description.",
        },
        {
            icon: ShoppingCart,
            title: "Manage Orders",
            description:
                "Track customer purchases and manage your book orders from one place.",
        },
        {
            icon: BarChart3,
            title: "Sales Analytics",
            description:
                "Monitor sales, revenue and your best-performing books with useful insights.",
        },
        {
            icon: Users,
            title: "Reach More Buyers",
            description:
                "Showcase your books to readers looking for new knowledge and great stories.",
        },
        {
            icon: Star,
            title: "Reviews & Ratings",
            description:
                "View customer feedback and understand what readers think about your books.",
        },
        {
            icon: ShieldCheck,
            title: "Secure Platform",
            description:
                "Your account and book information are protected with secure platform features.",
        },
    ];

    const policies = [
        "Only upload books that you have permission to sell.",
        "Provide accurate book information, pricing and descriptions.",
        "Do not upload copyrighted material without proper authorization.",
        "Maintain professional and appropriate content.",
        "Keep book availability and pricing information updated.",
        "Respect customers and respond professionally to reviews.",
    ];

    const reviews = [
        {
            name: "Rahul Sharma",
            role: "Book Seller",
            review:
                "Adding and managing my books became extremely simple. The dashboard gives me a clear idea of my sales.",
        },
        {
            name: "Priya Mehta",
            role: "Author",
            review:
                "I love how easy it is to showcase my books. The platform makes reaching new readers much easier.",
        },
        {
            name: "Aman Khan",
            role: "Publisher",
            review:
                "The clean interface and sales insights make managing my collection much more convenient.",
        },
    ];

    const faqs = [
        {
            question: "Who can become an admin?",
            answer:
                "Anyone who wants to list and sell books on the platform can register as a seller, provided they follow the platform policies.",
        },
        {
            question: "Can I add multiple books?",
            answer:
                "Yes. After registration, you can add and manage multiple books from your admin dashboard.",
        },
        {
            question: "Can I edit my book after adding it?",
            answer:
                "Yes. You can update information such as title, price, discount, category, image and description.",
        },
        {
            question: "Can I see customer reviews?",
            answer:
                "Yes. Reviews and ratings can be used to understand customer feedback and improve your book listings.",
        },
    ];


    return (
        <div className="min-h-screen overflow-hidden bg-slate-950 text-white">

            {/* ================= NAVBAR ================= */}

            <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">

                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-lg shadow-violet-500/20">
                            <BookOpen size={21} />
                        </div>

                        <div>
                            <h1 className="text-lg font-bold">
                                Book<span className="text-cyan-400">Store</span>
                            </h1>
                            <p className="text-[10px] uppercase tracking-widest text-slate-400">
                                Seller Center
                            </p>
                        </div>
                    </div>

                    {/* Desktop navigation */}

                    <div className="hidden items-center gap-8 md:flex">
                        <a
                            href="#features"
                            className="text-sm text-slate-300 transition hover:text-white"
                        >
                            Features
                        </a>

                        <a
                            href="#how"
                            className="text-sm text-slate-300 transition hover:text-white"
                        >
                            How It Works
                        </a>

                        <a
                            href="#policy"
                            className="text-sm text-slate-300 transition hover:text-white"
                        >
                            Policies
                        </a>

                        <a
                            href="#reviews"
                            className="text-sm text-slate-300 transition hover:text-white"
                        >
                            Reviews
                        </a>

                        <button onClick={()=> navigate("/admin-login")} className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10">
                            Login
                        </button>

                        <button onClick={()=> navigate("/admin-signup")} className="rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-5 py-2.5 text-sm font-bold shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5">
                            Sign Up
                        </button>
                    </div>

                    {/* Mobile button */}

                    <button
                        onClick={() => setMobileMenu(!mobileMenu)}
                        className="rounded-lg border border-white/10 p-2 md:hidden"
                    >
                        {mobileMenu ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>

                {/* Mobile menu */}

                {mobileMenu && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="border-t border-white/10 px-5 py-5 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            <a href="#features">Features</a>
                            <a href="#how">How It Works</a>
                            <a href="#policy">Policies</a>
                            <a href="#reviews">Reviews</a>

                            <button className="rounded-xl border border-white/10 py-3">
                                Login
                            </button>

                            <button className="rounded-xl bg-violet-600 py-3 font-bold">
                                Sign Up
                            </button>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* ================= HERO ================= */}

            <section className="relative isolate">
                {/* Background effects */}

                <div className="absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[130px]" />

                <div className="absolute right-0 top-40 -z-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

                <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">

                    {/* Left */}

                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                    >
                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-4 py-2 text-sm text-violet-300">
                            <Sparkles size={15} />
                            Become a Book Seller
                        </div>

                        <h1 className="text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
                            Turn Your
                            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                                Books Into Business.
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
                            Join our bookstore platform, showcase your books,
                            connect with readers and manage your entire
                            collection from one powerful seller dashboard.
                        </p>

                        <div className="mt-9 flex flex-col gap-4 sm:flex-row">

                            <button className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-500 px-7 py-4 font-bold shadow-xl shadow-violet-500/20 transition hover:-translate-y-1">
                                Start Selling
                                <ArrowRight
                                    size={18}
                                    className="transition group-hover:translate-x-1"
                                />
                            </button>

                            <button className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-semibold backdrop-blur transition hover:bg-white/10">
                                <LockKeyhole size={18} />
                                Admin Login
                            </button>

                        </div>

                        {/* Trust */}

                        <div className="mt-9 flex flex-wrap gap-5 text-sm text-slate-400">
                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-emerald-400"
                                />
                                Easy Setup
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-emerald-400"
                                />
                                Secure Account
                            </div>

                            <div className="flex items-center gap-2">
                                <CheckCircle2
                                    size={17}
                                    className="text-emerald-400"
                                />
                                Seller Dashboard
                            </div>
                        </div>
                    </motion.div>

                    {/* Right dashboard preview */}

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-r from-violet-500/20 to-cyan-500/20 blur-2xl" />

                        <div className="relative rounded-3xl border border-white/10 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-xl">

                            {/* Header */}

                            <div className="flex items-center justify-between border-b border-white/10 pb-5">
                                <div>
                                    <p className="text-xs text-slate-500">
                                        ADMIN DASHBOARD
                                    </p>
                                    <h3 className="mt-1 text-lg font-bold">
                                        Welcome, Seller 👋
                                    </h3>
                                </div>

                                <div className="rounded-xl bg-emerald-400/10 p-3 text-emerald-400">
                                    <TrendingUp size={22} />
                                </div>
                            </div>

                            {/* Stats */}

                            <div className="grid grid-cols-2 gap-4 py-5">

                                <div className="rounded-2xl bg-white/5 p-5">
                                    <p className="text-sm text-slate-500">
                                        Total Books
                                    </p>
                                    <p className="mt-2 text-3xl font-black">
                                        128
                                    </p>
                                    <p className="mt-1 text-xs text-emerald-400">
                                        +12 this month
                                    </p>
                                </div>

                                <div className="rounded-2xl bg-white/5 p-5">
                                    <p className="text-sm text-slate-500">
                                        Total Orders
                                    </p>
                                    <p className="mt-2 text-3xl font-black">
                                        842
                                    </p>
                                    <p className="mt-1 text-xs text-emerald-400">
                                        +18.4%
                                    </p>
                                </div>

                            </div>

                            {/* Fake graph */}

                            <div className="rounded-2xl bg-white/5 p-5">
                                <div className="mb-5 flex justify-between">
                                    <div>
                                        <p className="text-sm text-slate-400">
                                            Monthly Revenue
                                        </p>
                                        <p className="mt-1 text-2xl font-bold">
                                            ₹48,290
                                        </p>
                                    </div>

                                    <BarChart3 className="text-violet-400" />
                                </div>

                                <div className="flex h-32 items-end gap-2">
                                    {[35, 50, 42, 70, 55, 85, 65, 95, 75, 100].map(
                                        (height, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ height: 0 }}
                                                animate={{ height: `${height}%` }}
                                                transition={{
                                                    delay: index * 0.05,
                                                    duration: 0.5,
                                                }}
                                                className="flex-1 rounded-t-md bg-gradient-to-t from-violet-600 to-cyan-400"
                                            />
                                        )
                                    )}
                                </div>
                            </div>

                            {/* Recent order */}

                            <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/5 p-4">
                                <div className="flex items-center gap-3">
                                    <div className="rounded-xl bg-violet-500/10 p-3 text-violet-400">
                                        <BookOpen size={18} />
                                    </div>

                                    <div>
                                        <p className="text-sm font-semibold">
                                            Clean Code
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            New order received
                                        </p>
                                    </div>
                                </div>

                                <span className="text-sm font-bold text-emerald-400">
                                    +₹799
                                </span>
                            </div>

                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ================= STATS ================= */}

            <section className="border-y border-white/10 bg-white/[0.02]">
                <div className="mx-auto grid max-w-7xl grid-cols-2 px-5 py-10 md:grid-cols-4">

                    {[
                        ["10K+", "Books Listed"],
                        ["5K+", "Active Buyers"],
                        ["98%", "Seller Satisfaction"],
                        ["24/7", "Platform Access"],
                    ].map(([number, label], index) => (
                        <div
                            key={index}
                            className="border-white/10 px-5 py-5 text-center md:border-r last:border-r-0"
                        >
                            <p className="text-3xl font-black text-white sm:text-4xl">
                                {number}
                            </p>

                            <p className="mt-2 text-sm text-slate-500">
                                {label}
                            </p>
                        </div>
                    ))}

                </div>
            </section>

            {/* ================= FEATURES ================= */}

            <section id="features" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">

                <div className="mx-auto max-w-2xl text-center">
                    <span className="text-sm font-bold uppercase tracking-widest text-cyan-400">
                        Powerful Features
                    </span>

                    <h2 className="mt-3 text-4xl font-black sm:text-5xl">
                        Everything You Need to
                        <span className="text-violet-400"> Sell Books</span>
                    </h2>

                    <p className="mt-5 text-slate-400">
                        Manage your books, orders, customers and performance
                        without complicated tools.
                    </p>
                </div>

                <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                    {features.map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                whileHover={{ y: -8 }}
                                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:border-violet-500/30 hover:bg-white/[0.06]"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-cyan-500/20 text-violet-400 transition group-hover:scale-110">
                                    <Icon size={23} />
                                </div>

                                <h3 className="mt-6 text-xl font-bold">
                                    {feature.title}
                                </h3>

                                <p className="mt-3 leading-7 text-slate-400">
                                    {feature.description}
                                </p>

                                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-violet-400">
                                    Learn more
                                    <ArrowRight size={15} />
                                </div>
                            </motion.div>
                        );
                    })}

                </div>
            </section>

            {/* ================= HOW IT WORKS ================= */}

            <section
                id="how"
                className="border-y border-white/10 bg-white/[0.02]"
            >
                <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">

                    <div className="text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-violet-400">
                            Simple Process
                        </span>

                        <h2 className="mt-3 text-4xl font-black">
                            Start Selling in 4 Steps
                        </h2>
                    </div>

                    <div className="relative mt-16 grid gap-10 md:grid-cols-4">

                        {[
                            {
                                icon: Users,
                                title: "Create Account",
                                text: "Register your seller account.",
                            },
                            {
                                icon: PlusCircle,
                                title: "Add Books",
                                text: "Add your books and pricing.",
                            },
                            {
                                icon: Eye,
                                title: "Get Discovered",
                                text: "Buyers discover your books.",
                            },
                            {
                                icon: TrendingUp,
                                title: "Grow Sales",
                                text: "Track and improve your sales.",
                            },
                        ].map((step, index) => {
                            const Icon = step.icon;

                            return (
                                <motion.div
                                    key={step.title}
                                    initial={{ opacity: 0, y: 25 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative text-center"
                                >
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-violet-500/20 bg-violet-500/10 text-violet-400">
                                        <Icon size={27} />
                                    </div>

                                    <div className="mx-auto mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-slate-800 text-xs font-bold text-slate-400">
                                        {index + 1}
                                    </div>

                                    <h3 className="mt-4 font-bold">
                                        {step.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-slate-500">
                                        {step.text}
                                    </p>
                                </motion.div>
                            );
                        })}

                    </div>
                </div>
            </section>

            {/* ================= POLICY ================= */}

            <section id="policy" className="mx-auto max-w-7xl px-5 py-24 sm:px-8">

                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

                    <div>
                        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                            <ShieldCheck size={28} />
                        </div>

                        <h2 className="text-4xl font-black sm:text-5xl">
                            Seller Policies
                        </h2>

                        <p className="mt-5 leading-8 text-slate-400">
                            We want our marketplace to remain trustworthy,
                            useful and fair for both sellers and buyers.
                            Please follow these guidelines when listing books.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {policies.map((policy, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                            >
                                <CheckCircle2
                                    size={21}
                                    className="mt-0.5 shrink-0 text-emerald-400"
                                />

                                <p className="text-sm leading-6 text-slate-300">
                                    {policy}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </section>

            {/* ================= REVIEWS ================= */}

            <section
                id="reviews"
                className="border-y border-white/10 bg-white/[0.02]"
            >
                <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">

                    <div className="text-center">
                        <span className="text-sm font-bold uppercase tracking-widest text-yellow-400">
                            Seller Reviews
                        </span>

                        <h2 className="mt-3 text-4xl font-black">
                            Loved by Book Sellers
                        </h2>
                    </div>

                    <div className="mt-14 grid gap-6 md:grid-cols-3">

                        {reviews.map((review, index) => (
                            <motion.div
                                key={review.name}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -5 }}
                                className="rounded-3xl border border-white/10 bg-slate-900 p-7"
                            >
                                <div className="flex gap-1 text-yellow-400">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            size={16}
                                            fill="currentColor"
                                        />
                                    ))}
                                </div>

                                <p className="mt-6 leading-7 text-slate-300">
                                    "{review.review}"
                                </p>

                                <div className="mt-7 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-cyan-400 font-bold">
                                        {review.name.charAt(0)}
                                    </div>

                                    <div>
                                        <p className="font-semibold">
                                            {review.name}
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            {review.role}
                                        </p>
                                    </div>

                                    <BadgeCheck
                                        size={17}
                                        className="ml-auto text-cyan-400"
                                    />
                                </div>
                            </motion.div>
                        ))}

                    </div>
                </div>
            </section>

            {/* ================= FAQ ================= */}

            <section className="mx-auto max-w-4xl px-5 py-24">

                <div className="text-center">
                    <CircleHelp className="mx-auto text-violet-400" size={32} />

                    <h2 className="mt-4 text-4xl font-black">
                        Frequently Asked Questions
                    </h2>
                </div>

                <div className="mt-12 space-y-3">

                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]"
                        >
                            <button
                                onClick={() =>
                                    setOpenFaq(
                                        openFaq === index ? null : index
                                    )
                                }
                                className="flex w-full items-center justify-between p-5 text-left font-semibold"
                            >
                                {faq.question}

                                <ChevronDown
                                    size={19}
                                    className={`transition ${openFaq === index
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                />
                            </button>

                            {openFaq === index && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="px-5 pb-5 text-sm leading-7 text-slate-400"
                                >
                                    {faq.answer}
                                </motion.div>
                            )}
                        </div>
                    ))}

                </div>
            </section>

            {/* ================= FINAL CTA ================= */}

            <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[2rem] border border-violet-400/20 bg-gradient-to-br from-violet-600 via-purple-600 to-cyan-600 p-10 text-center sm:p-16"
                >

                    <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

                    <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-300/10 blur-3xl" />

                    <div className="relative">
                        <Package
                            size={38}
                            className="mx-auto mb-5"
                        />

                        <h2 className="text-4xl font-black sm:text-5xl">
                            Ready to Start Selling?
                        </h2>

                        <p className="mx-auto mt-5 max-w-xl text-white/80">
                            Create your seller account today and start
                            showcasing your books to readers.
                        </p>

                        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

                            <button onClick={()=> navigate("/admin-signup")} className="rounded-xl bg-white px-7 py-4 font-bold text-violet-700 shadow-xl transition hover:-translate-y-1">
                                Create Admin Account
                            </button>

                            <button onClick={()=> navigate("/admin-login")} className="rounded-xl border border-white/30 bg-white/10 px-7 py-4 font-semibold backdrop-blur transition hover:bg-white/20">
                                Already a seller? Login
                            </button>

                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ================= FOOTER ================= */}

            <footer className="border-t border-white/10 bg-black/20">
                <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">

                    <div>
                        <p className="font-bold">
                            Book<span className="text-cyan-400">Store</span>
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                            Seller Center
                        </p>
                    </div>

                    <p className="text-sm text-slate-500">
                        © 2026 BookStore. All rights reserved.
                    </p>

                </div>
            </footer>

        </div>
    );
};

export default Admin;