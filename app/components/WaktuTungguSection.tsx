"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { FaClock } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

const dataByYear: Record<string, number[]> = {
  "2025": [45, 27, 18, 10],
  "2024": [42, 30, 18, 10],
  "2023": [38, 32, 20, 10],
};

export default function WaktuTungguSection() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [year, setYear] = useState("2025");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (chartRef.current) chartRef.current.destroy();
    chartRef.current = new Chart(ref.current!, {
      type: "doughnut",
      data: {
        labels: ["< 3 Bulan", "3-6 Bulan", "6-12 Bulan", "> 12 Bulan"],
        datasets: [{ data: dataByYear[year], backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"], borderWidth: 0 }],
      },
      options: { plugins: { legend: { position: "bottom" } }, animation: { animateRotate: true, duration: 1000 } },
    });
    return () => chartRef.current?.destroy();
  }, [year]);

  const fastJob = dataByYear[year][0] + dataByYear[year][1];

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-gray-50">
      <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Waktu Tunggu Kerja</h2>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
            <option value="2025">Tahun 2025</option>
            <option value="2024">Tahun 2024</option>
            <option value="2023">Tahun 2023</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-center">
          <div className="space-y-4 order-2 md:order-1">
            <div className="flex items-center gap-3 text-green-600">
              <FaClock className="text-xl sm:text-2xl" />
              <span className="text-base sm:text-lg font-semibold">Insight Data</span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Sebanyak <span className="font-semibold text-green-600">{fastJob}%</span> alumni mendapatkan pekerjaan dalam waktu kurang dari 6 bulan setelah lulus.</p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-green-50 p-3 sm:p-4 rounded-xl hover:shadow-md transition-shadow">
                <p className="text-xl sm:text-2xl font-bold text-green-600">{dataByYear[year][0]}%</p>
                <p className="text-xs sm:text-sm text-gray-600">&lt; 3 Bulan</p>
              </div>
              <div className="bg-blue-50 p-3 sm:p-4 rounded-xl hover:shadow-md transition-shadow">
                <p className="text-xl sm:text-2xl font-bold text-blue-600">{dataByYear[year][1]}%</p>
                <p className="text-xs sm:text-sm text-gray-600">3-6 Bulan</p>
              </div>
            </div>
          </div>
          <div className="max-w-[280px] sm:max-w-sm mx-auto w-full order-1 md:order-2">
            <canvas ref={ref} />
          </div>
        </div>
      </div>
    </section>
  );
}
