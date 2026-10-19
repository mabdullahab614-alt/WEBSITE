import React from 'react';
import { Award, CheckCircle2, Headphones, Truck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const stats = [
    { value: '5K+', label: 'Happy Customers', sub: 'Across 40+ countries' },
    { value: '300+', label: 'Products', sub: 'In stock & tested' },
    { value: '12', label: 'Top Brands', sub: 'Official authorized partner' },
    { value: '99.8%', label: 'Satisfaction', sub: '5-star customer ratings' }
  ];

  const highlights = [
    {
      icon: Award,
      title: 'Original & Certified',
      desc: '100% genuine factory sealed products with official serial number verification.'
    },
    {
      icon: Truck,
      title: 'Lightning Shipping',
      desc: 'Same-day dispatch with live tracking and insured express courier delivery.'
    },
    {
      icon: Headphones,
      title: '24/7 After-Sales Support',
      desc: 'Dedicated technical team for setup, warranty claims, and device optimization.'
    },
    {
      icon: CheckCircle2,
      title: '1-Year Full Warranty',
      desc: 'Comprehensive hardware replacement warranty and repair coverage on all gear.'
    }
  ];

  return (
    <section id="about" className="relative z-10 py-24 px-6 sm:px-12 lg:px-20 max-w-7xl mx-auto">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title matching PDF */}
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          About Us
        </h2>

        {/* Paragraph text matching PDF */}
        <p className="about mt-6 text-base sm:text-lg text-[#b0b8d0] leading-relaxed max-w-2xl mx-auto">
          GadgetHub is your one-stop shop for original mobile phones and premium accessories. We offer warranty on every product, fast delivery and friendly after-sales support.
        </p>

        {/* Stats matching PDF */}
        <div className="stats mt-14 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-6 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-sm hover:border-cyan-400/40 transition-colors text-center"
            >
              <b className="block text-4xl sm:text-5xl font-extrabold text-[#00e5ff] tracking-tight">
                {s.value}
              </b>
              <span className="block mt-2 text-sm sm:text-base font-bold text-white">
                {s.label}
              </span>
              <span className="block mt-1 text-xs text-[#b0b8d0]">
                {s.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Highlight pillars */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {highlights.map((h) => {
            const Icon = h.icon;
            return (
              <div
                key={h.title}
                className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 flex items-start gap-4 hover:bg-white/[0.07] transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00e5ff]/20 to-[#7c4dff]/20 border border-cyan-400/30 flex items-center justify-center shrink-0 text-[#00e5ff]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">{h.title}</h3>
                  <p className="text-sm text-[#b0b8d0] mt-1 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
