import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Technologies from "@/components/Technologies";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Technologies />
      <About />
      
      <Team />
      
      <Footer />
    </>
  );
}
