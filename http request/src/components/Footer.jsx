

const Footer = () => {
    return (
        <div className='bg-red-500'>
            <footer className="relative overflow-hidden border-t border-slate-800 bg-slate-950 text-slate-300">
                {/* Background Blur */}
                <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[120px]" />

                <div className="relative mx-auto max-w-7xl px-6 py-16">
                    <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
                        {/* Brand */}
                        <div>
                            <h2 className="text-3xl font-bold text-white">
                                <span className="bg-gradient-to-r from-cyan-400 via-sky-500 to-indigo-500 bg-clip-text text-transparent">
                                    AlgoLogg
                                </span>
                            </h2>

                            <p className="mt-5 leading-7 text-slate-400">
                                Empowering developers with coding resources, roadmaps, notes, and
                                practical learning experiences.
                            </p>

                            <button className="mt-6 rounded-xl bg-cyan-500 px-5 py-2.5 font-medium text-white transition hover:bg-cyan-400">
                                Explore →
                            </button>
                        </div>

                        {/* Links */}
                        <div>
                            <h3 className="mb-5 text-lg font-semibold text-white">
                                Navigation
                            </h3>

                            <ul className="space-y-3">
                                {["Home", "Roadmaps", "Blogs", "Resources", "Contact"].map(
                                    (item) => (
                                        <li key={item}>
                                            <a
                                                href="#"
                                                className="transition duration-300 hover:pl-2 hover:text-cyan-400"
                                            >
                                                {item}
                                            </a>
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>

                        {/* Resources */}
                        <div>
                            <h3 className="mb-5 text-lg font-semibold text-white">
                                Resources
                            </h3>

                            <ul className="space-y-3">
                                {[
                                    "Documentation",
                                    "Tutorials",
                                    "Community",
                                    "GitHub",
                                    "FAQs",
                                ].map((item) => (
                                    <li key={item}>
                                        <a
                                            href="#"
                                            className="transition duration-300 hover:pl-2 hover:text-cyan-400"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="mb-5 text-lg font-semibold text-white">
                                Stay Updated
                            </h3>

                            <p className="mb-5 text-slate-400">
                                Subscribe to receive updates about new features and articles.
                            </p>

                            <div className="flex rounded-xl border border-slate-700 bg-slate-900 p-1">
                                <input
                                    type="email"
                                    placeholder="Email address"
                                    className="flex-1 bg-transparent px-3 py-2 text-white outline-none placeholder:text-slate-500"
                                />

                                <button className="rounded-lg bg-cyan-500 px-4 py-2 font-medium text-white transition hover:bg-cyan-400">
                                    Join
                                </button>
                            </div>

                            {/* Social */}
                            <div className="mt-6 flex gap-3">
                                {["GitHub", "LinkedIn", "Twitter", "Discord"].map((item) => (
                                    <a
                                        key={item}
                                        href="#"
                                        className="rounded-lg border border-slate-700 px-3 py-2 text-sm transition hover:border-cyan-400 hover:bg-cyan-500 hover:text-white"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-sm text-slate-500 md:flex-row">
                        <p>© {new Date().getFullYear()} AlgoLogg. All rights reserved.</p>

                        <div className="flex gap-6">
                            <a href="#" className="hover:text-cyan-400">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-cyan-400">
                                Terms
                            </a>
                            <a href="#" className="hover:text-cyan-400">
                                Cookies
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
