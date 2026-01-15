import Hero from "@/app/components/Hero";
import Stat from "@/app/components/Stat";
import { StatusChart, FakultasChart, GajiChart, WaktuTungguChart } from "@/app/components/Charts";
import GrowStat from "@/app/components/GrowStat";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <Stat />
      <section id="grafik" className="py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Data Alumni</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Status Alumni</h3>
            <StatusChart />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Waktu Tunggu Kerja</h3>
            <WaktuTungguChart />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Alumni Bekerja per Fakultas</h3>
            <FakultasChart />
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h3 className="text-lg font-semibold mb-4">Distribusi Gaji Alumni</h3>
            <GajiChart />
          </div>
        </div>
      </section>
      <GrowStat />
      <Footer />
    </div>
  );
}
