"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend } from "chart.js";
import { motion } from "motion/react";
import { FaUniversity, FaBook } from "react-icons/fa";

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend);

const fakultasData = [
  { name: "Kedokteran", value: 92 },
  { name: "Teknik", value: 85 },
  { name: "Ekonomi & Bisnis", value: 82 },
  { name: "Hukum", value: 78 },
  { name: "Pendidikan & Sains", value: 75 },
  { name: "FISIP", value: 70 },
  { name: "Pertanian", value: 68 },
];

const prodiData = [
  { name: "Pendidikan Dokter", value: 92 },
  { name: "Bisnis Digital", value: 88 },
  { name: "Akuntansi", value: 85 },
  { name: "Teknik Sipil", value: 85 },
  { name: "Teknik Elektro", value: 83 },
  { name: "DKV", value: 82 },
  { name: "Manajemen", value: 80 },
  { name: "Ilmu Hukum", value: 78 },
  { name: "Pend. Guru SD", value: 78 },
  { name: "Ilmu Komunikasi", value: 75 },
  { name: "Pend. Bahasa Inggris", value: 72 },
];

export default function FakultasProdi() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [inView, setInView] = useState(false);
  const [tab, setTab] = useState<"fakultas" | "prodi">("fakultas");

  useEffect(() => {
    if (!ref.current || !inView) return;
    if (chartRef.current) chartRef.current.destroy();
    
    const currentData = tab === "fakultas" ? fakultasData : prodiData;
    const colors = currentData.map(d => d.value >= 85 ? "#22c55e" : d.value >= 75 ? "#3b82f6" : "#f59e0b");
    
    chartRef.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: currentData.map(d => d.name),
        datasets: [{
          data: currentData.map(() => 0),
          backgroundColor: colors,
          borderRadius: 8,
          barThickness: 22
        }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: { 
          legend: { display: false },
          tooltip: {
            backgroundColor: "rgba(0,0,0,0.8)",
            padding: 12,
            cornerRadius: 8,
            callbacks: {
              label: (ctx) => ` ${ctx.raw}% Bekerja`
            }
          }
        },
        scales: {
          x: { beginAtZero: true, max: 100, grid: { color: "#f3f4f6" }, ticks: { callback: (v) => v + "%" } },
          y: { grid: { display: false } }
        },
        animation: { duration: 0 }
      },
    });

    // Animate bars sequentially
    let currentBar = 0;
    const animateBar = () => {
      if (currentBar >= currentData.length) return;
      
      let progress = 0;
      const animateSingle = () => {
        progress += 0.08;
        if (progress > 1) progress = 1;
        
        const eased = 1 - Math.pow(1 - progress, 3);
        chartRef.current!.data.datasets[0].data[currentBar] = currentData[currentBar].value * eased;
        chartRef.current!.update("none");
        
        if (progress < 1) {
          requestAnimationFrame(animateSingle);
        } else {
          currentBar++;
          setTimeout(animateBar, 80);
        }
      };
      requestAnimationFrame(animateSingle);
    };
    animateBar();

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, [tab, inView]);

  return (
    <motion.section
      className="py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      onViewportEnter={() => setInView(true)}
    >
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Penyerapan Kerja per Fakultas & Prodi</h2>
        <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Persentase alumni yang bekerja berdasarkan fakultas dan program studi di UGJ</p>
      </motion.div>

      <motion.div
        className="flex justify-center gap-3 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        <motion.button
          onClick={() => setTab("fakultas")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${tab === "fakultas" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-700"}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaUniversity /> Fakultas
        </motion.button>
        <motion.button
          onClick={() => setTab("prodi")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${tab === "prodi" ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg" : "bg-gray-100 text-gray-700"}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaBook /> Program Studi
        </motion.button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        <motion.div
          className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-2xl shadow-lg"
          style={{ height: tab === "fakultas" ? "380px" : "480px" }}
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          layout
        >
          <canvas ref={ref} />
        </motion.div>

        <motion.div
          className="lg:col-span-1 space-y-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-xl text-white"
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-sm text-green-100">Tertinggi</p>
            <p className="text-xl font-bold">{tab === "fakultas" ? "Kedokteran" : "Pend. Dokter"}</p>
            <p className="text-3xl font-bold">92%</p>
          </motion.div>

          <div className="bg-gray-50 p-5 rounded-xl">
            <p className="text-sm text-gray-600 mb-3 font-medium">Keterangan Warna</p>
            <div className="space-y-3">
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <div className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-gray-700">≥ 85% (Sangat Baik)</span>
              </motion.div>
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <div className="w-4 h-4 rounded-full bg-blue-500" />
                <span className="text-gray-700">75-84% (Baik)</span>
              </motion.div>
              <motion.div className="flex items-center gap-3" whileHover={{ x: 5 }}>
                <div className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-gray-700">&lt; 75% (Cukup)</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
