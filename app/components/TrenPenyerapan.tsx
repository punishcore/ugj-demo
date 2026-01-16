"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, CategoryScale, LinearScale, LineElement, PointElement, LineController, Tooltip, Legend, Filler } from "chart.js";
import { motion } from "motion/react";
import { FaChartLine } from "react-icons/fa";

Chart.register(CategoryScale, LinearScale, LineElement, PointElement, LineController, Tooltip, Legend, Filler);

export default function TrenPenyerapan() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || !inView) return;
    if (chartRef.current) chartRef.current.destroy();
    
    const labels = ["2020", "2021", "2022", "2023", "2024", "2025"];
    const data = [65, 68, 70, 72, 74, 72];
    
    chartRef.current = new Chart(ref.current, {
      type: "line",
      data: {
        labels,
        datasets: [{
          label: "% Bekerja",
          data: data.map(() => 50),
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
          pointRadius: 8,
          pointBackgroundColor: "#3b82f6",
          pointBorderColor: "#fff",
          pointBorderWidth: 3,
          pointHoverRadius: 12,
          borderWidth: 4
        }],
      },
      options: {
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
          y: { beginAtZero: false, min: 50, max: 100, grid: { color: "#f3f4f6" }, ticks: { callback: (v) => v + "%" } },
          x: { grid: { display: false } }
        },
        animation: { duration: 0 }
      },
    });

    // Animate line drawing point by point
    let currentPoint = 0;
    const animatePoint = () => {
      if (currentPoint >= data.length) return;
      
      let progress = 0;
      const animateSingle = () => {
        progress += 0.08;
        if (progress > 1) progress = 1;
        
        const eased = 1 - Math.pow(1 - progress, 3);
        const startVal = currentPoint === 0 ? 50 : data[currentPoint - 1];
        const targetVal = data[currentPoint];
        chartRef.current!.data.datasets[0].data[currentPoint] = startVal + (targetVal - startVal) * eased;
        chartRef.current!.update("none");
        
        if (progress < 1) {
          requestAnimationFrame(animateSingle);
        } else {
          currentPoint++;
          setTimeout(animatePoint, 150);
        }
      };
      requestAnimationFrame(animateSingle);
    };
    animatePoint();

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, [inView]);

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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Tren Penyerapan Lulusan per Tahun</h2>
        <p className="text-gray-500 mt-2">Perkembangan persentase alumni yang bekerja dari tahun ke tahun</p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <motion.div
          className="lg:col-span-3 bg-gradient-to-br from-gray-50 to-blue-50 p-6 rounded-2xl shadow-lg h-[350px]"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <canvas ref={ref} />
        </motion.div>
        
        <div className="space-y-4">
          <motion.div
            className="bg-gray-100 p-5 rounded-xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-sm text-gray-500 mb-1">Tahun 2020</p>
            <p className="text-3xl font-bold text-gray-600">65%</p>
          </motion.div>
          
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 rounded-xl text-white"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <p className="text-sm text-blue-100 mb-1">Tahun 2025</p>
            <p className="text-3xl font-bold">72%</p>
          </motion.div>
          
          <motion.div
            className="bg-gradient-to-r from-green-500 to-green-600 p-5 rounded-xl text-white flex items-center gap-3"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <FaChartLine className="text-3xl" />
            <div>
              <p className="text-2xl font-bold">+7%</p>
              <p className="text-sm text-green-100">dalam 5 tahun</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
