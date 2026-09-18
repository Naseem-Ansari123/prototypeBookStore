import { useState } from "react";
import { X, Sparkles, ThumbsUp, ThumbsDown, ExternalLink } from "lucide-react";

const BookInsights = ({ book, onClose }) => {

    const [loading, setLoading] = useState(false);

    // Temporary dummy data
    const [insights, setInsights] = useState({
        summary:
            "Atomic Habits explains how small and consistent changes in daily behavior can create significant long-term results. The book focuses on building good habits and breaking bad ones through practical strategies.",

        positive: [
            "Readers appreciate the practical and easy-to-follow approach.",
            "The examples make the concepts easier to understand.",
            "Many readers find the habit-building framework useful."
        ],

        negative: [
            "Some readers find certain ideas repetitive.",
            "Some concepts may feel basic for experienced readers.",
            "The book can feel longer than necessary in some sections."
        ],

        sources: [
            {
                title: "Google Books",
                url: "https://books.google.com/"
            },
            {
                title: "Reader Reviews",
                url: "#"
            }
        ]
    });

    const handleGenerate = () => {

        setLoading(true);

        // Temporary simulation
        setTimeout(() => {
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-4">

                    <div className="flex items-center gap-2">

                        <Sparkles
                            size={22}
                            className="text-purple-600"
                        />

                        <h2 className="text-xl font-bold text-gray-800">
                            AI Book Insights
                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                        className="rounded-full p-2 text-gray-500 hover:bg-gray-100"
                    >
                        <X size={22} />
                    </button>

                </div>


                {/* Book Information */}
                <div className="px-6 pt-5">

                    <h3 className="text-2xl font-bold text-gray-900">
                        {book?.title}
                    </h3>

                    {book?.author && (
                        <p className="mt-1 text-sm text-gray-500">
                            by {book.author}
                        </p>
                    )}

                </div>


                {/* Content */}
                <div className="space-y-6 px-6 py-5">

                    {/* Summary */}
                    <section>

                        <div className="mb-2 flex items-center gap-2">

                            <span className="text-xl">
                                📖
                            </span>

                            <h4 className="text-lg font-semibold">
                                Summary
                            </h4>

                        </div>

                        <p className="leading-7 text-gray-600">
                            {insights.summary}
                        </p>

                    </section>


                    {/* Positive */}
                    <section>

                        <div className="mb-3 flex items-center gap-2">

                            <ThumbsUp
                                size={20}
                                className="text-green-600"
                            />

                            <h4 className="text-lg font-semibold">
                                What Readers Like
                            </h4>

                        </div>

                        <div className="space-y-2">

                            {insights.positive.map((item, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg bg-green-50 px-4 py-3 text-sm text-gray-700"
                                >
                                    • {item}
                                </div>

                            ))}

                        </div>

                    </section>


                    {/* Negative */}
                    <section>

                        <div className="mb-3 flex items-center gap-2">

                            <ThumbsDown
                                size={20}
                                className="text-red-600"
                            />

                            <h4 className="text-lg font-semibold">
                                Common Criticism
                            </h4>

                        </div>

                        <div className="space-y-2">

                            {insights.negative.map((item, index) => (

                                <div
                                    key={index}
                                    className="rounded-lg bg-red-50 px-4 py-3 text-sm text-gray-700"
                                >
                                    • {item}
                                </div>

                            ))}

                        </div>

                    </section>


                    {/* Sources */}
                    <section>

                        <div className="mb-3 flex items-center gap-2">

                            <span className="text-xl">
                                🔗
                            </span>

                            <h4 className="text-lg font-semibold">
                                Sources
                            </h4>

                        </div>

                        <div className="space-y-2">

                            {insights.sources.map((source, index) => (

                                <a
                                    key={index}
                                    href={source.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between rounded-lg border px-4 py-3 text-sm hover:bg-gray-50"
                                >

                                    <span>
                                        {source.title}
                                    </span>

                                    <ExternalLink size={16} />

                                </a>

                            ))}

                        </div>

                    </section>

                </div>


                {/* Footer */}
                <div className="sticky bottom-0 border-t bg-white px-6 py-4">

                    <button
                        onClick={handleGenerate}
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 py-3 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                        <Sparkles size={18} />

                        {loading
                            ? "Analyzing..."
                            : "Refresh AI Insights"
                        }

                    </button>

                </div>

            </div>

        </div>
    );
};

export default BookInsights;