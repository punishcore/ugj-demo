"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

const texts = [
  { title: "Tracer Study UGJ", subtitle: "Universitas Swadaya Gunung Jati Cirebon", desc: "Melacak Jejak Alumni, Membangun Masa Depan Bangsa" },
  { title: "Data Alumni Terkini", subtitle: "Statistik & Analisis Komprehensif", desc: "Menghubungkan Alumni dengan Dunia Kerja" },
  { title: "Akreditasi Unggul", subtitle: "Komitmen Kualitas Pendidikan", desc: "Mencetak Lulusan Berkompeten dan Berdaya Saing" },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % texts.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + texts.length) % texts.length);
  const next = () => setCurrent((c) => (c + 1) % texts.length);

  return (
    <section className=" h-screen overflow-hidden">
      <Image src="/CAMPUS.jpeg" alt="Hero" fill className="object-cover" />
      <div className="absolute inset-0 bg-linear-to-t from-blue-800/80 to-blue-600/20 flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl font-bold">{texts[current].title}</h1>
        <p className="mt-3 text-blue-200 text-lg">{texts[current].subtitle}</p>
        <p className="mt-6 text-xl max-w-2xl">{texts[current].desc}</p>
        <div className="mt-8 flex gap-4">
          <a href="#statistik" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50">Lihat Data</a>
          <a href="#grafik" className="border border-white px-6 py-2 rounded-full hover:bg-white/10">Grafik Alumni</a>
        </div>
      </div>
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
        <IoChevronBack className="text-2xl text-gray-800" />
      </button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white transition-colors">
        <IoChevronForward className="text-2xl text-gray-800" />
      </button>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {texts.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} className={`w-3 h-3 rounded-full transition-colors ${i === current ? "bg-white" : "bg-white/50"}`} />
        ))}
      </div>
    </section>
  );
}
