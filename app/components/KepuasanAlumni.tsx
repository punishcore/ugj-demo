"use client";
import { useEffect, useRef } from "react";
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController } from "chart.js";
import { motion } from "motion/react";
import { FaStar } from "react-icons/fa";

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, RadarController);

export default function KepuasanAlumni() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();
    
    chartRef.current = new Chart(ref.current, {
      type: "radar",
      data: {
        labels: ["Kurikulum", "Dosen", "Fasilitas", "Soft Skill"],
        datasets: [{
          label: "Kepuasan",
          data: [4.2, 4.5, 3.8, 4.3],
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          borderColor: "#3b82f6",
          borderWidth: 3,
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#fff",
          pointBorderWidth: 3,
          pointRadius: 8,
          pointHoverRadius: 10
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: {
          r: {
            beginAtZero: true,
            max: 5,
            min: 0,
            ticks: { stepSize: 1, display: true, font: { size: 12 } },
            grid: { color: "#e5e7eb", lineWidth: 2 },
            angleLines: { color: "#e5e7eb", lineWidth: 2 },
            pointLabels: { font: { size: 14, weight: "bold" }, color: "#374151" }
          }
        }
      },
    });

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, []);

  const ratings = [
    { label: "Kurikulum", value: 4.2, color: "bg-blue-500", text: "text-blue-600" },
    { label: "Dosen", value: 4.5, color: "bg-green-500", text: "text-green-600" },
    { label: "Fasilitas", value: 3.8, color: "bg-yellow-500", text: "text-yellow-600" },
    { label: "Soft Skill", value: 4.3, color: "bg-purple-500", text: "text-purple-600" },
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
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Kepuasan Alumni terhadap Kampus</h2>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">Tingkat kepuasan alumni terhadap berbagai aspek perkuliahan (skala 1-5)</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6 flex items-center gap-4">
              <div className="bg-yellow-100 p-4 rounded-xl">
                <FaStar className="text-yellow-500 text-3xl" />
              </div>
              <div>
                <p className="text-5xl font-bold text-gray-800">4.2<span className="text-2xl text-gray-400">/5</span></p>
                <p className="text-gray-600">Rata-rata kepuasan alumni</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {ratings.map((r) => (
                <div key={r.label} className="bg-white p-4 rounded-xl shadow-sm">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full ${r.color}`} />
                    <span className="text-gray-600">{r.label}</span>
                  </div>
                  <p className={`text-3xl font-bold ${r.text}`}>{r.value}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full max-w-[420px]">
            <canvas ref={ref} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
