"use client";

export default function StatusPage() {
  const systems = [
    { name: "Website", status: "Operational" },
    { name: "API", status: "Operational" },
    { name: "Database", status: "Operational" },
    { name: "DDoS Protection", status: "Active" },
    { name: "Email Service", status: "Operational" },
  ];

  return (
    <main className="max-w-6xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">📊 System Status</h1>
      <p className="text-gray-600 text-center mb-10">
        All critical systems are monitored in real-time.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {systems.map((sys, idx) => (
          <div
            key={idx}
            className={`p-5 rounded-xl shadow-md text-center ${
              sys.status.includes("Operational")
                ? "bg-green-50 text-green-800"
                : sys.status.includes("Active")
                ? "bg-blue-50 text-blue-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            <h2 className="text-lg font-semibold mb-2">{sys.name}</h2>
            <p className="text-sm">{sys.status}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
