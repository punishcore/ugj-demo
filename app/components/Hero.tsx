"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

const texts = [
  { title: "Tracer Study UGJ", desc: "Melacak Jejak Alumni, Membangun Masa Depan Bangsa" },
  { title: "Data Alumni Terkini", desc: "Menghubungkan Alumni dengan Dunia Kerja" },
  { title: "Akreditasi Unggul", desc: "Mencetak Lulusan Berkompeten dan Berdaya Saing" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
    const timer = setInterval(() => setCurrent((c) => (c + 1) % texts.length), 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      <Image src="/CAMPUS.jpeg" alt="Hero" fill className="object-cover scale-105" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-800/50 to-transparent" />
      
      <div className={`absolute inset-0 flex flex-col items-start justify-center text-white px-6 sm:px-12 md:px-20 lg:px-32 transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-xs sm:text-sm md:text-base tracking-wide font-medium mb-4 px-4 py-2 rounded-full">Universitas Swadaya Gunung Jati</span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight drop-shadow-lg">{texts[current].title}</h1>
        <p className="mt-3 sm:mt-5 text-base sm:text-lg md:text-xl lg:text-2xl max-w-xl md:max-w-2xl text-white/90 leading-relaxed">{texts[current].desc}</p>
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <a href="#statistik" className="bg-white text-blue-700 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg text-center text-sm sm:text-base">Lihat Data</a>
          <a href="#testimoni" className="border-2 border-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all text-center text-sm sm:text-base">Testimoni</a>
        </div>
      </div>
    </section>
  );
}
