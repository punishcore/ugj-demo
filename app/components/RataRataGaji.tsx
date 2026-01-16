"use client";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from "chart.js";
import { motion } from "motion/react";
import { FaMoneyBillWave } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController);

export default function RataRataGaji() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (chartRef.current) chartRef.current.destroy();
    
    chartRef.current = new Chart(ref.current, {
      type: "doughnut",
      data: {
        labels: ["< 3 juta", "3-5 juta", "5-7 juta", "> 7 juta"],
        datasets: [{
          data: [15, 40, 30, 15],
          backgroundColor: ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e"],
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
    { label: "< 3 juta", value: 15, color: "bg-red-500", text: "text-red-600" },
    { label: "3-5 juta", value: 40, color: "bg-yellow-500", text: "text-yellow-600" },
    { label: "5-7 juta", value: 30, color: "bg-blue-500", text: "text-blue-600" },
    { label: "> 7 juta", value: 15, color: "bg-green-500", text: "text-green-600" },
  ];

  return (
    <motion.section
      className="py-20 px-4 sm:px-8 md:px-16 lg:px-32 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 w-full">
            <div className="flex items-center gap-3 mb-4">
              <FaMoneyBillWave className="text-3xl text-green-600" />
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-800">Rata-rata Gaji Pertama</h2>
            </div>
            <p className="text-gray-500 mb-8">Distribusi range gaji pertama alumni setelah bekerja.</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              {data.map((d) => (
                <div key={d.label} className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-4 h-4 rounded-full ${d.color}`} />
                    <span className="text-gray-600 text-sm">{d.label}</span>
                  </div>
                  <p className={`text-3xl font-bold ${d.text}`}>{d.value}%</p>
                </div>
              ))}
            </div>
            
            <div className="bg-green-50 p-5 rounded-2xl border-l-4 border-green-500">
              <p className="text-3xl font-bold text-green-600">85%</p>
              <p className="text-gray-600">Alumni memiliki gaji di atas 3 juta rupiah</p>
            </div>
          </div>
          
          <div className="relative w-full max-w-[400px]">
            <canvas ref={ref} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <p className="text-5xl font-bold text-gray-800">85%</p>
                <p className="text-gray-500 mt-1">&gt; 3 Juta</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
