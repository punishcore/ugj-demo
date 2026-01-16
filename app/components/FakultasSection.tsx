"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend } from "chart.js";
import { FaUniversity, FaBook } from "react-icons/fa";

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend);

const fakultasData: Record<string, number[]> = {
  "2025": [78, 72, 85, 70, 88, 75],
  "2024": [75, 70, 82, 68, 85, 72],
  "2023": [72, 68, 80, 65, 82, 70],
};
const fakultasLabels = ["FT", "FKIP", "FE", "FH", "FIKES", "FISIP"];

const prodiData: Record<string, number[]> = {
  "2025": [82, 75, 88, 70, 85, 78, 90, 72],
  "2024": [80, 72, 85, 68, 82, 75, 88, 70],
  "2023": [78, 70, 82, 65, 80, 72, 85, 68],
};
const prodiLabels = ["Teknik Informatika", "Manajemen", "Akuntansi", "Hukum", "Keperawatan", "PGSD", "Farmasi", "Ilmu Komunikasi"];

export default function FakultasSection() {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [year, setYear] = useState("2025");
  const [tab, setTab] = useState<"fakultas" | "prodi">("fakultas");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.2 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;
    if (chartInstance.current) chartInstance.current.destroy();

    const isFakultas = tab === "fakultas";
    chartInstance.current = new Chart(chartRef.current, {
      type: "bar",
      data: {
        labels: isFakultas ? fakultasLabels : prodiLabels,
        datasets: [{ label: "Alumni Bekerja (%)", data: isFakultas ? fakultasData[year] : prodiData[year], backgroundColor: isFakultas ? "#3b82f6" : "#8b5cf6", borderRadius: 8 }]
      },
      options: {
        indexAxis: isFakultas ? "x" : "y",
        scales: isFakultas ? { y: { beginAtZero: true, max: 100 } } : { x: { beginAtZero: true, max: 100 } },
        plugins: { legend: { display: false } },
        animation: { duration: 800 }
      },
    });
    return () => { chartInstance.current?.destroy(); };
  }, [year, tab]);

  const fData = fakultasData[year];
  const pData = prodiData[year];
  const fMaxIdx = fData.indexOf(Math.max(...fData));
  const pMaxIdx = pData.indexOf(Math.max(...pData));
  const fAvg = Math.round(fData.reduce((a, b) => a + b, 0) / fData.length);
  const pAvg = Math.round(pData.reduce((a, b) => a + b, 0) / pData.length);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-white">
      <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Alumni Bekerja</h2>
          <select value={year} onChange={(e) => setYear(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
            <option value="2025">Tahun 2025</option>
            <option value="2024">Tahun 2024</option>
            <option value="2023">Tahun 2023</option>
          </select>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <button onClick={() => setTab("fakultas")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${tab === "fakultas" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            <FaUniversity />Per Fakultas
          </button>
          <button onClick={() => setTab("prodi")} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${tab === "prodi" ? "bg-purple-600 text-white shadow-lg" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
            <FaBook />Per Prodi
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          <div className="lg:col-span-2 bg-gray-50 p-4 sm:p-6 rounded-2xl shadow-md">
            <canvas ref={chartRef} />
          </div>
          <div className="space-y-4">
            <div className={`flex items-center gap-3 ${tab === "fakultas" ? "text-blue-600" : "text-purple-600"}`}>
              {tab === "fakultas" ? <FaUniversity className="text-xl sm:text-2xl" /> : <FaBook className="text-xl sm:text-2xl" />}
              <span className="text-base sm:text-lg font-semibold">Insight {tab === "fakultas" ? "Fakultas" : "Prodi"}</span>
            </div>
            {tab === "fakultas" ? (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Fakultas <span className="font-semibold text-blue-600">{fakultasLabels[fMaxIdx]}</span> memiliki tingkat penyerapan kerja tertinggi ({fData[fMaxIdx]}%).</p>
            ) : (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Prodi <span className="font-semibold text-purple-600">{prodiLabels[pMaxIdx]}</span> memiliki tingkat penyerapan kerja tertinggi ({pData[pMaxIdx]}%).</p>
            )}
            <div className={`p-4 rounded-xl ${tab === "fakultas" ? "bg-blue-50" : "bg-purple-50"} hover:shadow-md transition-shadow`}>
              <p className={`text-2xl sm:text-3xl font-bold ${tab === "fakultas" ? "text-blue-600" : "text-purple-600"}`}>{tab === "fakultas" ? fAvg : pAvg}%</p>
              <p className="text-xs sm:text-sm text-gray-600">Rata-rata Alumni Bekerja</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
