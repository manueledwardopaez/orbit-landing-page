import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
import IntegrationsSection from "./sections/IntegrationsSection";
import TestimonialsSection from "./sections/TestimonialsSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative overflow-hidden selection:bg-cyan-500/30">
      {/* Background Layers */}
      <div className="hero-bg" />
      <div className="atmosphere" />
      
      <Navbar />
      <HeroSection />

      {/* Hero bottom fade */}
      <div className="hero-bottom-fade" />

      <FeaturesSection />
      <IntegrationsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
