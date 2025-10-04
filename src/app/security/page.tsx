"use client";

export default function SecurityPage() {
  const tips = [
    "Always use strong passwords and enable 2FA.",
    "Keep software and dependencies up to date.",
    "Monitor unusual login attempts and network activity.",
    "Educate employees about phishing and social engineering.",
    "Back up data regularly and securely.",
  ];

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">🔒 Security Best Practices</h1>
      <p className="text-gray-600 text-center mb-10">
        Protect your organization by following these cybersecurity tips.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tips.map((tip, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-br from-red-50 to-white p-5 rounded-xl shadow-md hover:shadow-xl transition-transform hover:-translate-y-1"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Tip {idx + 1}</h2>
            <p className="text-gray-600 text-sm">{tip}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
