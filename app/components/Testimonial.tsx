"use client";
import { useEffect, useRef, useState } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const testimonials = [
  { name: "Andi Pratama", job: "Software Engineer di Tokopedia", year: "2022", text: "Tracer study membantu saya terhubung dengan jaringan alumni yang luas dan membuka banyak peluang karir.", rating: 5 },
  { name: "Siti Nurhaliza", job: "Data Analyst di Bank BCA", year: "2021", text: "Berkat UGJ, saya mendapat pekerjaan impian dalam 3 bulan setelah lulus. Kurikulum yang relevan dengan industri.", rating: 5 },
  { name: "Budi Santoso", job: "Founder Startup Edutech", year: "2020", text: "Ilmu kewirausahaan di UGJ sangat membantu saya membangun bisnis sendiri dari nol hingga sukses.", rating: 5 },
];

export default function Testimonial() {
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="testimoni" className="relative px-4 sm:px-8 md:px-16 lg:px-32 py-12 sm:py-16 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
      {/* Wave SVG - putih di atas */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 sm:h-24" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb" />
        </svg>
      </div>
      <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Testimoni Alumni</h2>
          <p className="text-blue-200 text-sm sm:text-base mt-2">Apa kata alumni tentang pengalaman mereka di UGJ</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((t, i) => (
            <div key={t.name} className="bg-white/10 backdrop-blur-sm p-5 sm:p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 hover:-translate-y-1" style={{ transitionDelay: `${i * 100}ms` }}>
              <FaQuoteLeft className="text-xl sm:text-2xl text-white/40" />
              <p className="text-white mt-3 text-sm sm:text-base leading-relaxed">{t.text}</p>
              <div className="flex gap-1 mt-3">
                {[...Array(t.rating)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}
              </div>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm sm:text-base">
                  {t.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm sm:text-base">{t.name}</p>
                  <p className="text-blue-200 text-xs sm:text-sm">{t.job}</p>
                  <p className="text-blue-300 text-xs">Angkatan {t.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
