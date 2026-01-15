import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="UGJ" width={40} height={40} />
          <span className="font-bold text-blue-600">Tracer UGJ</span>
        </Link>
        <div className="flex gap-6 text-sm">
          <Link href="#statistik" className="hover:text-blue-600">Statistik</Link>
          <Link href="#grafik" className="hover:text-blue-600">Grafik</Link>
          <Link href="#pertumbuhan" className="hover:text-blue-600">Pertumbuhan</Link>
        </div>
      </div>
    </nav>
  );
}
