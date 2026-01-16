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
    <section className="relative min-h-screen overflow-hidden">
      <Image src="/CAMPUS.jpeg" alt="Hero" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-linear-to-t from-blue-900/95 via-blue-800/60 to-blue-900/30" />
      
      <div className={`absolute inset-0 flex flex-col items-center lg:items-start justify-center text-white px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 pt-16 transition-all duration-1000 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <span className="inline-block bg-linear-to-r from-blue-600 via-blue-700 to-indigo-800 backdrop-blur-sm text-white text-xs sm:text-sm tracking-wide font-medium mb-4 sm:mb-6 px-4 py-2 rounded-full text-center">
          Universitas Swadaya Gunung Jati
        </span>
        
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight drop-shadow-lg text-center lg:text-left max-w-4xl">
          {texts[current].title}
        </h1>
        
        <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl max-w-sm sm:max-w-lg md:max-w-xl lg:max-w-2xl text-white/90 leading-relaxed text-center lg:text-left">
          {texts[current].desc}
        </p>
        
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
          <a href="#statistik" className="bg-white text-blue-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-bold hover:bg-blue-50 hover:scale-105 transition-all shadow-lg text-center text-sm sm:text-base">
            Lihat Data
          </a>
          <a href="#testimoni" className="border-2 border-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full font-semibold hover:bg-white hover:text-blue-700 transition-all text-center text-sm sm:text-base">
            Testimoni
          </a>
        </div>
      </div>
    </section>
  );
}
