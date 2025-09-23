export default function Team() {
  const members = [
    { name: "Kundan Kumar", role: "CEO & Founder", qualification: "M.Tech in Cybersecurity, IIT DELHI", image: "/team1.jpg" },
    { name: "Khushi Yadav", role: "Managing and Designing", qualification: "Bachelor of Pharmacy", image: "/team2.jpg" },
    { name: "Chandni", role: "Internal Management", qualification: "Computer Science", image: "/team3.jpg" },
  ];

  return (
    <section id="team" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Leadership</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
        {members.map((member, i) => (
          <div
            key={i}
            className="bg-white shadow-lg rounded-lg p-4 sm:p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-36 h-36 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-900 break-words w-full">{member.name}</h3>
            <p className="text-blue-800 font-medium break-words w-full mt-1">{member.role}</p>
            <p className="text-gray-800 text-sm break-words w-full mt-2">{member.qualification}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
