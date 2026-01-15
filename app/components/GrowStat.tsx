"use client";
import { useEffect, useRef } from "react";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, LineController, Tooltip, Legend } from "chart.js";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Tooltip, Legend);

const growthData = [
  { year: "2020", alumni: 1850, bekerja: 68 },
  { year: "2021", alumni: 2100, bekerja: 70 },
  { year: "2022", alumni: 2350, bekerja: 72 },
  { year: "2023", alumni: 2680, bekerja: 75 },
  { year: "2024", alumni: 2920, bekerja: 78 },
  { year: "2025", alumni: 3150, bekerja: 80 },
];

export default function GrowStat() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const chart = new Chart(ref.current!, {
      type: "line",
      data: {
        labels: growthData.map((d) => d.year),
        datasets: [
          { label: "Total Alumni", data: growthData.map((d) => d.alumni), borderColor: "#3b82f6", backgroundColor: "#3b82f680", tension: 0.3, fill: true },
          { label: "% Bekerja", data: growthData.map((d) => d.bekerja * 30), borderColor: "#22c55e", tension: 0.3, yAxisID: "y1" },
        ],
      },
      options: {
        scales: {
          y: { beginAtZero: true, title: { display: true, text: "Jumlah Alumni" } },
          y1: { position: "right", min: 0, max: 100, title: { display: true, text: "% Bekerja" }, ticks: { callback: (v) => (Number(v) / 30).toFixed(0) + "%" } },
        },
      },
    });
    return () => chart.destroy();
  }, []);

  return (
    <section id="pertumbuhan" className="py-16 px-4 bg-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Pertumbuhan Alumni</h2>
        <p className="text-center text-gray-600 mb-8">Tren jumlah alumni dan tingkat penyerapan kerja 2020-2025</p>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <canvas ref={ref} />
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8 text-center">
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-blue-600">+70%</p>
            <p className="text-gray-500 text-sm">Pertumbuhan Alumni</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-green-600">+12%</p>
            <p className="text-gray-500 text-sm">Peningkatan Kerja</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <p className="text-2xl font-bold text-purple-600">3,150</p>
            <p className="text-gray-500 text-sm">Alumni 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
