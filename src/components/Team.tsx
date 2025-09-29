// export default function Team() {
//   const members = [
//     { name: "Kundan Kumar", role: "CEO & Founder", qualification: "M.Tech in Cybersecurity, IIT DELHI", image: "/team1.jpg" },
//     { name: "Khushi ", role: "Managing and Designing", qualification: "Bachelor of Pharmacy", image: "/team2.jpg" },
//     { name: "Chandni", role: "Internal Management", qualification: "Computer Science", image: "/team3.jpg" },
//   ];

//   return (
//     <section id="team" className="py-16 bg-gray-50">
//       <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Our Leadership</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
//         {members.map((member, i) => (
//           <div
//             key={i}
//             className="bg-white shadow-lg rounded-lg p-4 sm:p-6 text-center hover:shadow-xl hover:scale-105 transition-all duration-300 flex flex-col items-center"
//           >
//             <img
//               src={member.image}
//               alt={member.name}
//               className="w-36 h-36 rounded-full object-cover mb-4"
//             />
//             <h3 className="text-xl font-semibold text-gray-900 break-words w-full">{member.name}</h3>
//             <p className="text-blue-800 font-medium break-words w-full mt-1">{member.role}</p>
//             <p className="text-gray-800 text-sm break-words w-full mt-2">{member.qualification}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

"use client";

import { useState } from "react";

export default function Team() {
  const [isOpen, setIsOpen] = useState(false);

  const members = [
    { name: "Kundan Kumar", role: "CEO & Founder", qualification: "M.Tech in Cybersecurity, IIT DELHI" },
    { name: "Khushi", role: "Managing and Designing", qualification: "Bachelor of Pharmacy" },
    { name: "Chandni", role: "Internal Management", qualification: "Computer Science" },
  ];

  const teamDescription = `Our leadership team comprises ${members[0].name}, the ${members[0].role} with a prestigious ${members[0].qualification}. Alongside is ${members[1].name}, handling ${members[1].role}, bringing expertise from ${members[1].qualification}. Completing the trio is ${members[2].name}, overseeing ${members[2].role} with a background in ${members[2].qualification}. Together, they drive our mission with passion and professionalism.`;

  return (
    <section id="team" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer flex items-center justify-center mb-8 select-none space-x-3"
          role="button"
          aria-expanded={isOpen}
          aria-controls="team-description"
        >
          <h2 className="text-3xl font-bold text-gray-800">Our Leadership</h2>
          <span
            className={`text-3xl text-gray-600 transition-transform duration-300 hover:text-gray-900 ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-label={isOpen ? "Collapse" : "Expand"}
          >
            ▼
          </span>
        </div>

        {isOpen && (
          <p
            id="team-description"
            className="text-gray-700 text-lg leading-relaxed font-serif tracking-wide max-w-xl mx-auto"
            style={{ animation: "fadeIn 0.5s ease forwards" }}
          >
            {teamDescription}
          </p>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
