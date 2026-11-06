import { Benefits } from "@/components/Benefits";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Benefits />
      <LeadForm />
      <Footer />
    </main>
  );
}
