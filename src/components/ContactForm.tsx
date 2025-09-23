"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");

    const res = await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setStatus("Thank you for your feedback!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <section id="contact" className="py-16 bg-gray-50">
      {/* Darker heading */}
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-blue-900">
        Contact Us
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white shadow-lg p-6 sm:p-8 rounded-xl"
      >
        {/* Darker placeholders */}
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={form.message}
          onChange={handleChange}
          required
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg h-32 resize-none placeholder-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg w-full hover:bg-blue-700 transition-colors duration-200">
          Send
        </button>
        {status && (
          <p className="mt-4 text-center text-gray-700 font-medium">{status}</p>
        )}
      </form>
    </section>
  );
}
