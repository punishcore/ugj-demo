"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend } from "chart.js";
import { motion } from "motion/react";

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend);

export default function SebaranIndustri() {
  const ref = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current || !inView) return;
    if (chartRef.current) chartRef.current.destroy();
    
    const labels = ["IT & Software", "Pendidikan", "Keuangan", "Manufaktur", "Kesehatan", "Wirausaha"];
    const data = [28, 22, 18, 12, 10, 10];
    const colors = ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4"];
    
    chartRef.current = new Chart(ref.current, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          data: data.map(() => 0),
          backgroundColor: colors,
          borderRadius: 8,
          barThickness: 28,
          hoverBackgroundColor: colors.map(c => c + "dd")
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
              label: (ctx) => ` ${ctx.raw}%`
            }
          }
        },
        scales: {
          x: { beginAtZero: true, max: 35, grid: { color: "#f3f4f6" }, ticks: { callback: (v) => v + "%" } },
          y: { grid: { display: false } }
        },
        animation: { duration: 0 }
      },
    });

    // Animate bars one by one
    let currentBar = 0;
    const animateBar = () => {
      if (currentBar >= data.length) return;
      
      let progress = 0;
      const animateSingle = () => {
        progress += 0.05;
        if (progress > 1) progress = 1;
        
        const eased = 1 - Math.pow(1 - progress, 3);
        chartRef.current!.data.datasets[0].data[currentBar] = data[currentBar] * eased;
        chartRef.current!.update("none");
        
        if (progress < 1) {
          requestAnimationFrame(animateSingle);
        } else {
          currentBar++;
          setTimeout(animateBar, 100);
        }
      };
      requestAnimationFrame(animateSingle);
    };
    animateBar();

    return () => { chartRef.current?.destroy(); chartRef.current = null; };
  }, [inView]);

  const highlights = [
    { label: "IT & Software", value: 28, color: "from-blue-500 to-blue-600" },
    { label: "Pendidikan", value: 22, color: "from-purple-500 to-purple-600" },
    { label: "Keuangan", value: 18, color: "from-green-500 to-green-600" },
  ];

  return (
    <motion.section
      className="py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-gray-50"
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
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Sebaran Bidang Industri</h2>
        <p className="text-gray-500 mt-2">Distribusi alumni berdasarkan sektor industri tempat bekerja</p>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <motion.div
          className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-lg h-[350px]"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <canvas ref={ref} />
        </motion.div>
        
        <div className="space-y-4">
          {highlights.map((h, i) => (
            <motion.div
              key={h.label}
              className={`bg-gradient-to-r ${h.color} p-5 rounded-xl text-white`}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.15, duration: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <p className="text-3xl font-bold">{h.value}%</p>
              <p className="text-white/80 text-sm">{h.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
