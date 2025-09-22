import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gray-50 py-16 px-4">
      <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
      <p className="text-center text-gray-700 mb-10 max-w-2xl">
        Have questions or want to work with us? Send us a message below and our team
        will get back to you as soon as possible.
      </p>
      <ContactForm />
      <Footer />
    </section>
  );
}
