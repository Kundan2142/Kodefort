export default function Services() {
  return (
    <section id="services" className="py-16">
      <h2 className="text-3xl font-bold text-center mb-10">Our Services</h2>
      <div className="grid md:grid-cols-3 gap-8 text-center">
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold">Software Development</h3>
          <p className="mt-3 text-gray-600">
            Custom solutions to meet your business needs.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold">Cybersecurity</h3>
          <p className="mt-3 text-gray-600">
            Protect your systems with enterprise-grade security.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg">
          <h3 className="text-xl font-semibold">Consulting</h3>
          <p className="mt-3 text-gray-600">
            Expert advice to guide your technology strategy.
          </p>
        </div>
      </div>
    </section>
  );
}
