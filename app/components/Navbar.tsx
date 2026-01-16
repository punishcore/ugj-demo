"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { IoStatsChart, IoBarChart, IoPeople, IoMenu, IoClose, IoLogoWhatsapp, IoLogoFacebook, IoLogoYoutube, IoLogoTiktok } from "react-icons/io5";

const links = [
  { href: "#statistik", label: "Statistik", icon: IoStatsChart },
  { href: "#grafik", label: "Grafik", icon: IoBarChart },
  { href: "#testimoni", label: "Testimoni", icon: IoPeople },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 sticky top-0 z-50 shadow-xl">
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
          <a href="#" className="hover:text-green-400 transition-colors"><IoLogoWhatsapp /></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><IoLogoFacebook /></a>
          <a href="#" className="hover:text-red-500 transition-colors"><IoLogoYoutube /></a>
          <a href="#" className="hover:text-pink-400 transition-colors"><IoLogoTiktok /></a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-white text-2xl p-2">
          {open ? <IoClose /> : <IoMenu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-blue-800/95 backdrop-blur-sm px-4 pb-4 animate-fade-in">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white/10 rounded-lg">
              <l.icon className="text-lg" /><span>{l.label}</span>
            </Link>
          ))}
          <div className="flex gap-4 mt-4 px-4 text-white text-xl">
            <a href="#"><IoLogoWhatsapp /></a>
            <a href="#"><IoLogoFacebook /></a>
            <a href="#"><IoLogoYoutube /></a>
            <a href="#"><IoLogoTiktok /></a>
          </div>
        </div>
      )}
    </nav>
  );
}
