export default function Navbar() {
  return (
    <nav className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4">
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between gap-8">
        <div className="flex items-center gap-2">
        <a href="#">
          <img
              src="/images/Astronaut-Helmet-PNG-File.webp"
              alt="Orbit logo"
              className="w-9 h-9 rounded-full object-cover"
            />
        </a>
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">Home</a>
          <a href="#feature" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">Feature</a>
          <a href="#integration" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">Integration</a>
          <a href="#testimonial" className="hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">Testimonial</a>
        </div>
        
        <a href="#" className="btn-glow glass px-6 py-2 rounded-full text-sm font-medium">
          Contact Us
        </a>
      </div>
    </nav>
  );
}
