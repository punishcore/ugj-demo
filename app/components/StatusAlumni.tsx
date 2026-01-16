"use client";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { motion } from "motion/react";
import { FaBriefcase, FaStore, FaGraduationCap, FaSearch } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function StatusAlumni() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();
    
    chartRef.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["Bekerja", "Wirausaha", "Studi Lanjut", "Belum Bekerja"],
        datasets: [{
          data: [72, 10, 12, 6],
          backgroundColor: ["#3b82f6", "#22c55e", "#8b5cf6", "#ef4444"],
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

  const stats = [
    { label: "Bekerja", value: 72, color: "bg-blue-500", textColor: "text-blue-600", icon: FaBriefcase },
    { label: "Wirausaha", value: 10, color: "bg-green-500", textColor: "text-green-600", icon: FaStore },
    { label: "Studi Lanjut", value: 12, color: "bg-purple-500", textColor: "text-purple-600", icon: FaGraduationCap },
    { label: "Belum Bekerja", value: 6, color: "bg-red-500", textColor: "text-red-600", icon: FaSearch },
  ];

  return (
    <motion.section
      id="grafik"
      className="py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Status Alumni Setelah Lulus</h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Distribusi status alumni UGJ berdasarkan aktivitas setelah menyelesaikan studi</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="relative w-full max-w-[400px]">
            <canvas ref={ref} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-800">82%</p>
                <p className="text-gray-500 mt-1">Produktif</p>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-gray-50 p-5 rounded-2xl">
                  <div className="flex items-center gap-3 mb-2">
                    <s.icon className={`text-xl ${s.textColor}`} />
                    <span className="text-gray-600">{s.label}</span>
                  </div>
                  <p className={`text-4xl font-bold ${s.textColor}`}>{s.value}%</p>
                </div>
              ))}
            </div>
            <div className="mt-6 bg-blue-50 p-5 rounded-2xl border-l-4 border-blue-500">
              <p className="text-gray-700">Sebanyak <span className="font-bold text-blue-600">82%</span> alumni UGJ telah produktif (bekerja + wirausaha) dalam waktu singkat setelah lulus.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
