"use client";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, PolarAreaController, RadialLinearScale } from "chart.js";
import { motion } from "motion/react";
import { FaCheckCircle } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend, PolarAreaController, RadialLinearScale);

export default function KesesuaianPekerjaan() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();
    
    chartRef.current = new Chart(ref.current, {
      type: "polarArea",
      data: {
        labels: ["Sangat Sesuai", "Sesuai", "Cukup Sesuai", "Kurang Sesuai", "Tidak Sesuai"],
        datasets: [{
          data: [35, 40, 15, 7, 3],
          backgroundColor: [
            "rgba(34, 197, 94, 0.8)",
            "rgba(59, 130, 246, 0.8)",
            "rgba(245, 158, 11, 0.8)",
            "rgba(249, 115, 22, 0.8)",
            "rgba(239, 68, 68, 0.8)"
          ],
          borderWidth: 3,
          borderColor: "#fff"
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: { legend: { display: false } },
        scales: { r: { display: false } }
      },
    });

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, []);

  const data = [
    { label: "Sangat Sesuai", value: 35, color: "bg-green-500" },
    { label: "Sesuai", value: 40, color: "bg-blue-500" },
    { label: "Cukup Sesuai", value: 15, color: "bg-yellow-500" },
    { label: "Kurang Sesuai", value: 7, color: "bg-orange-500" },
    { label: "Tidak Sesuai", value: 3, color: "bg-red-500" },
  ];

  return (
    <motion.section
      className="py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-3">
          <FaCheckCircle className="text-3xl text-blue-600" />
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Kesesuaian Pekerjaan</h2>
        </div>
        <p className="text-gray-500 max-w-2xl mx-auto">Tingkat relevansi pekerjaan alumni dengan bidang studi yang ditempuh</p>
      </div>
      
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full max-w-[400px]">
            <canvas ref={ref} />
          </div>
          
          <div className="flex-1 w-full">
            <div className="space-y-3 mb-6">
              {data.map((d) => (
                <div key={d.label} className="flex items-center gap-4">
                  <div className={`w-5 h-5 rounded-full ${d.color}`} />
                  <span className="text-gray-700 flex-1">{d.label}</span>
                  <span className="text-xl font-bold text-gray-800">{d.value}%</span>
                </div>
              ))}
            </div>
            
            <div className="bg-blue-50 p-6 rounded-2xl border-l-4 border-blue-500">
              <p className="text-4xl font-bold text-blue-600">75%</p>
              <p className="text-gray-600 mt-1">Alumni bekerja sesuai dengan bidang studi yang ditempuh</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
