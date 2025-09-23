export default function Services() {
  return (
    <section id="services" className="py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
        Our Services
      </h2>
      <div className="grid md:grid-cols-3 gap-8 text-center px-4 md:px-0">
        <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-900">Software Development</h3>
          <p className="mt-3 text-gray-800">
            Custom solutions to meet your business needs.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-900">Cybersecurity</h3>
          <p className="mt-3 text-gray-800">
            Protect your systems with enterprise-grade security.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
          <h3 className="text-xl font-semibold text-gray-900">Consulting</h3>
          <p className="mt-3 text-gray-800">
            Expert advice to guide your technology strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
