"use client";

interface Technology {
  name: string;
  image: string;
}

const technologies: Technology[] = [
  { name: "Next.js", image: "/tech/nextjs.png" },
  { name: "React.js", image: "/tech/react.png" },
  { name: "SQL", image: "/tech/sql.png" },
  { name: "MongoDB", image: "/tech/mongodb.png" },
  { name: "Laravel", image: "/tech/laravel.png" },
  { name: "PHP", image: "/tech/php.png" },
];

export default function Technologies() {
  return (
    <section id="technologies" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Technologies We Use
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 max-w-6xl mx-auto px-4 items-center">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-3 sm:p-4 bg-white shadow rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            <img
              src={tech.image}
              alt={tech.name}
              className="w-16 h-16 object-contain mb-2"
            />
            <p className="text-sm font-medium text-gray-800 text-center">
              {tech.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
