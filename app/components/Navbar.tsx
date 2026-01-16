"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoStatsChart, IoBarChart, IoPeople, IoMenu, IoClose, IoLogoWhatsapp, IoLogoYoutube, IoLogoTiktok, IoLogoInstagram } from "react-icons/io5";

const links = [
  { href: "#statistik", label: "Statistik", icon: IoStatsChart },
  { href: "#grafik", label: "Grafik", icon: IoBarChart },
  { href: "#testimoni", label: "Testimoni", icon: IoPeople },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-linear-to-r from-blue-600 via-blue-700 to-indigo-800 fixed w-full top-0 z-50 shadow-xl">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="UGJ" width={120} height={40} className="rounded-lg sm:w-[150px]" />
        </Link>

        <div className="hidden md:flex gap-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/15 transition-all">
              <l.icon className="text-lg" /><span>{l.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-3 text-white text-xl">
          <a href="https://wa.me/6285220008400" target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition-colors"><IoLogoWhatsapp /></a>
          <a href="https://www.instagram.com/ugj.official/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors"><IoLogoInstagram /></a>
          <a href="https://www.youtube.com/@Ugj.official" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors"><IoLogoYoutube /></a>
          <a href="https://www.tiktok.com/@ugj.official" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors"><IoLogoTiktok /></a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white text-2xl p-2">
          {open ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {/* Overlay */}
      <div className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setOpen(false)} />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-linear-to-b from-blue-700 to-indigo-800 z-50 md:hidden transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="text-white text-2xl"><IoClose /></button>
        </div>
        <div className="flex flex-col px-4">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg">
              <l.icon className="text-lg" /><span>{l.label}</span>
            </Link>
          ))}
        </div>
        <div className="flex gap-4 mt-6 px-8 text-white text-xl">
          <a href="https://wa.me/6285220008400" target="_blank" rel="noopener noreferrer"><IoLogoWhatsapp /></a>
          <a href="https://www.instagram.com/ugj.official/" target="_blank" rel="noopener noreferrer"><IoLogoInstagram /></a>
          <a href="https://www.youtube.com/@Ugj.official" target="_blank" rel="noopener noreferrer"><IoLogoYoutube /></a>
          <a href="https://www.tiktok.com/@ugj.official" target="_blank" rel="noopener noreferrer"><IoLogoTiktok /></a>
        </div>
      </div>
    </nav>
  );
}
