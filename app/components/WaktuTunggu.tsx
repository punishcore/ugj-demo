"use client";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { motion } from "motion/react";
import { FaClock } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function WaktuTunggu() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();
    
    chartRef.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["< 3 bulan", "3-6 bulan", "6-12 bulan", "> 12 bulan"],
        datasets: [{
          data: [45, 27, 18, 10],
          backgroundColor: ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444"],
          borderWidth: 0,
          hoverOffset: 15
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        cutout: "65%"
      },
    });

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, []);

  const data = [
    { label: "< 3 bulan", value: 45, color: "bg-green-500", text: "text-green-600" },
    { label: "3-6 bulan", value: 27, color: "bg-blue-500", text: "text-blue-600" },
    { label: "6-12 bulan", value: 18, color: "bg-yellow-500", text: "text-yellow-600" },
    { label: "> 12 bulan", value: 10, color: "bg-red-500", text: "text-red-600" },
  ];

  return (
    <motion.section
      className="py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 w-full order-2 lg:order-1">
            <div className="flex items-center gap-3 mb-4">
              <FaClock className="text-3xl text-blue-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Waktu Tunggu Kerja Pertama</h2>
            </div>
            <p className="text-gray-500 mb-8">Lama waktu yang dibutuhkan alumni untuk mendapatkan pekerjaan pertama setelah lulus.</p>
            
            <div className="space-y-3 mb-6">
              {data.map((d) => (
                <div key={d.label} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${d.color}`} />
                    <span className="text-gray-700">{d.label}</span>
                  </div>
                  <span className={`text-2xl font-bold ${d.text}`}>{d.value}%</span>
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 p-5 rounded-2xl border-l-4 border-green-500">
              <p className="text-3xl font-bold text-green-600">72%</p>
              <p className="text-gray-600">Alumni mendapat kerja dalam &lt; 6 bulan</p>
            </div>
          </div>
          
          <div className="relative w-full max-w-[400px] order-1 lg:order-2">
            <canvas ref={ref} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-800">72%</p>
                <p className="text-gray-500 mt-1">&lt; 6 Bulan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
