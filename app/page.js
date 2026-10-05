"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok)
        throw new Error(result.error || "Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Us</h1>
        <p className="text-gray-600 mb-6">We&apos;d love to hear from you.</p>

        {status === "success" ? (
          <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-green-800">
            Thank you! Your message has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                placeholder="Jane Doe"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition"
                placeholder="jane@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none transition resize-none"
                placeholder="Write your message here..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white transition hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>

            {status === "error" && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                {errorMessage}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
