"use client";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, PieController } from "chart.js";
import { motion } from "motion/react";
import { FaCity, FaMapMarkerAlt, FaGlobe, FaGlobeAmericas } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend, PieController);

export default function PersebaranWilayah() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();
    
    chartRef.current = new Chart(ref.current, {
      type: "pie",
      data: {
        labels: ["Dalam Kota", "Dalam Provinsi", "Nasional", "Internasional"],
        datasets: [{
          data: [35, 30, 30, 5],
          backgroundColor: ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b"],
          borderWidth: 4,
          borderColor: "#fff",
          hoverOffset: 15
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } }
      },
    });

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, []);

  const data = [
    { label: "Dalam Kota", value: 35, color: "bg-blue-500", icon: FaCity },
    { label: "Dalam Provinsi", value: 30, color: "bg-purple-500", icon: FaMapMarkerAlt },
    { label: "Nasional", value: 30, color: "bg-green-500", icon: FaGlobe },
    { label: "Internasional", value: 5, color: "bg-yellow-500", icon: FaGlobeAmericas },
  ];

  return (
    <motion.section
      className="py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-gray-50"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Persebaran Wilayah Kerja</h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Lokasi tempat kerja alumni berdasarkan wilayah geografis</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full max-w-[400px]">
            <canvas ref={ref} />
          </div>
          
          <div className="flex-1 w-full">
            <div className="space-y-4 mb-6">
              {data.map((d) => (
                <div key={d.label} className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <d.icon className="text-2xl text-gray-600" />
                    <div className={`w-4 h-4 rounded-full ${d.color}`} />
                    <span className="text-gray-700 font-medium">{d.label}</span>
                  </div>
                  <span className="text-2xl font-bold text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-5 rounded-2xl border-l-4 border-blue-500">
              <p className="text-3xl font-bold text-blue-600">95%</p>
              <p className="text-gray-600">Alumni bekerja di dalam negeri</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
