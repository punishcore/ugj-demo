"use client";
import Image from "next/image";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="px-4 sm:px-8 md:px-16 lg:px-32 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image src="/logo.png" alt="UGJ" width={120} height={40} className="rounded-lg" />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">Sistem pelacakan alumni Universitas Swadaya Gunung Jati untuk memantau perkembangan karir lulusan.</p>
          </div>
          
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4">Kontak</h4>
            <div className="space-y-3 text-gray-400 text-sm">
              <p className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-400 flex-shrink-0" />Jl. Pemuda No. 32, Cirebon</p>
              <p className="flex items-center gap-2"><FaPhone className="text-blue-400" />(0231) 206558 / 236742</p>
              <p className="flex items-center gap-2"><FaEnvelope className="text-blue-400" />humas@ugj.ac.id</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4">Link Cepat</h4>
            <div className="space-y-2 text-gray-400 text-sm">
              <a href="#statistik" className="block hover:text-white transition-colors">Statistik Alumni</a>
              <a href="#grafik" className="block hover:text-white transition-colors">Data Grafik</a>
              <a href="#testimoni" className="block hover:text-white transition-colors">Testimoni</a>
              <a href="https://ugj.ac.id" className="block hover:text-white transition-colors">Website UGJ</a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-base sm:text-lg mb-4">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a href="https://wa.me/6285220008400" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-green-600 transition-colors"><FaWhatsapp /></a>
              <a href="https://www.instagram.com/ugj.official/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-pink-600 transition-colors"><FaInstagram /></a>
              <a href="https://www.youtube.com/@Ugj.official" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-red-600 transition-colors"><FaYoutube /></a>
              <a href="https://www.tiktok.com/@ugj.official" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"><FaTiktok /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 px-4 sm:px-8 md:px-16 lg:px-32 py-4">
        <p className="text-center text-gray-500 text-xs sm:text-sm">© 2025 Tracer Study UGJ. All rights reserved.</p>
      </div>
    </footer>
  );
}
