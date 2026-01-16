"use client";
import { FaUserGraduate, FaBriefcase, FaChartLine } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

const stats = [
  { label: "Total Alumni", value: 12450, icon: FaUserGraduate },
  { label: "Bekerja < 6 Bulan", value: 72, suffix: "%", icon: FaBriefcase },
  { label: "Tingkat Respon", value: 78, suffix: "%", icon: FaChartLine },
];

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 1500;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * value));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
}

export default function Stat() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="statistik" className="px-4 sm:px-8 md:px-16 lg:px-32 py-12 sm:py-16 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800">
      <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center text-white mb-6 sm:mb-8">Statistik Alumni 2025</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center justify-center gap-4" style={{ transitionDelay: `${i * 100}ms` }}>
              <s.icon className="text-4xl sm:text-5xl text-white/80" />
              <div>
                <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
                  <AnimatedNumber value={s.value} suffix={s.suffix} />
                </p>
                <p className="text-blue-200 text-sm sm:text-base">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
