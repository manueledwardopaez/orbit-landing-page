import { Heart, Zap } from "lucide-react";
import { SOCIAL_LINKS } from "../utils/constants";
import { REDIRECTS } from "../utils/redirect";

export default function Footer() {
  return (
    <footer className="relative z-10 bg-[#060812] border-t border-white/5 px-4 pt-16 pb-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-14">
          {/* Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <a href="#">
                <img
                  src="/images/Astronaut-Helmet-PNG-File.webp"
                  alt="Orbit logo"
                  className="w-9 h-9 rounded-full object-cover"
                />
              </a>
              <span className="font-display font-bold text-lg">Orbit</span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs">
              The productivity platform built for teams that move fast and ship faster.
            </p>
            <div className="flex items-center gap-3 mt-6">
              {SOCIAL_LINKS.map((link, i) => (
                <a key={i} rel="noopener noreferrer" target="_blank" href={link.href} className="w-9 h-9 feature-card rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors">
                  <link.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Product",
              links: ["Features", "Integrations", "Changelog", "Roadmap"],
            },
            {
              title: "Legal",
              links: ["Privacy", "Terms", "Security", "Cookies"],
            },
          ].map((col) => (
            <div key={col.title}>
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-4">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-white/50 hover:text-white hover:drop-shadow-[0_0_8px_rgba(99,210,255,0.8)] transition-all duration-200">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/80">© {new Date().getFullYear()} Orbit Workflow, Inc. All rights reserved.</p>
          <div>
            <span className="text-xs text-white/80">Made with <Heart className="inline-block w-3.5 h-3.5 text-blue-500 fill-blue-500 align-text-bottom mx-0.5" /> by <a href={REDIRECTS.LINKEDIN} rel="noopener noreferrer" target="_blank" className="text-white underline" >Manuel Paez</a>. For teams that dare to move at the speed of light<Zap className="inline-block w-3.5 h-3.5 text-yellow-400 fill-yellow-400 align-text-bottom ml-0.5" />.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
