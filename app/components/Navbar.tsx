import Link from "next/link";
import Image from "next/image";
import { IoStatsChart, IoBarChart, IoTrendingUp, IoLogoWhatsapp, IoLogoFacebook, IoLogoYoutube, IoLogoTiktok } from "react-icons/io5";

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 sticky top-0 z-50 backdrop-blur-sm shadow-xl">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <Link href="/">
          <Image src="/logo.png" alt="UGJ" width={150} height={50} className="rounded-lg" />
        </Link>
        <div className="flex gap-2">
          <Link href="#statistik" className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/15 transition-all">
            <IoStatsChart className="text-lg" />
            <span>Statistik</span>
          </Link>
          <Link href="#grafik" className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/15 transition-all">
            <IoBarChart className="text-lg" />
            <span>Grafik</span>
          </Link>
          <Link href="#pertumbuhan" className="flex items-center gap-2 px-4 py-2 rounded-full text-white hover:bg-white/15 transition-all">
            <IoTrendingUp className="text-lg" />
            <span>Pertumbuhan</span>
          </Link>
        </div>
        <div className="flex gap-3 text-white text-xl">
          <a href="#" className="hover:text-green-400 transition-colors"><IoLogoWhatsapp /></a>
          <a href="#" className="hover:text-blue-400 transition-colors"><IoLogoFacebook /></a>
          <a href="#" className="hover:text-red-500 transition-colors"><IoLogoYoutube /></a>
          <a href="#" className="hover:text-pink-400 transition-colors"><IoLogoTiktok /></a>
        </div>
      </div>
    </nav>
  );
}
