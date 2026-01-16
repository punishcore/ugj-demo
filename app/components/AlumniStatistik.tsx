"use client";
import { useEffect, useRef, useState } from "react";
import { Chart, ArcElement, Tooltip, Legend, DoughnutController, CategoryScale, LinearScale, LineElement, PointElement, LineController } from "chart.js";
import { FaBriefcase, FaGraduationCap, FaStore, FaHome, FaUsers, FaUserTie, FaUserGraduate, FaChartLine } from "react-icons/fa";

Chart.register(ArcElement, Tooltip, Legend, DoughnutController, CategoryScale, LinearScale, LineElement, PointElement, LineController);

const stats = [
  { label: "Sudah Bekerja", value: 100, icon: FaBriefcase, color: "blue", desc: "Bekerja di berbagai sektor industri dalam waktu kurang dari 6 bulan setelah lulus." },
  { label: "Lanjut Studi", value: 0, icon: FaGraduationCap, color: "purple", desc: "Melanjutkan pendidikan ke jenjang S2 atau program studi lanjutan lainnya." },
  { label: "Wirausaha", value: 0, icon: FaStore, color: "green", desc: "Menjalankan usaha sendiri atau berwirausaha setelah lulus." },
  { label: "Mengurus Keluarga", value: 0, icon: FaHome, color: "orange", desc: "Memilih untuk fokus mengurus keluarga setelah lulus." },
];

const info = [
  { label: "Total Alumni", value: 2, icon: FaUsers },
  { label: "Alumni Bekerja", value: 2, icon: FaUserTie },
  { label: "Alumni Studi Lanjut", value: 0, icon: FaUserGraduate },
  { label: "Alumni Wirausaha", value: 0, icon: FaStore },
  { label: "Mengurus Keluarga", value: 0, icon: FaHome },
  { label: "Lulusan 1 Tahun Terakhir", value: 0, icon: FaChartLine },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600"
};

export default function AlumniStatistik() {
  const pieRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const pie = new Chart(pieRef.current!, {
      type: "doughnut",
      data: {
        labels: ["Bekerja", "Lanjut Studi", "Wirausaha", "Mengurus Keluarga"],
        datasets: [{ data: [100, 0, 0, 0], backgroundColor: ["#3b82f6", "#8b5cf6", "#22c55e", "#f59e0b"], borderWidth: 0 }],
      },
      options: { plugins: { legend: { position: "bottom" } }, animation: { animateRotate: true, duration: 1000 } },
    });
    const line = new Chart(lineRef.current!, {
      type: "line",
      data: {
        labels: ["2024"],
        datasets: [
          { label: "Bekerja", data: [100], borderColor: "#3b82f6", backgroundColor: "#3b82f6", tension: 0.3, fill: false },
          { label: "Lanjut Studi", data: [0], borderColor: "#8b5cf6", backgroundColor: "#8b5cf6", tension: 0.3, fill: false },
          { label: "Wirausaha", data: [0], borderColor: "#22c55e", backgroundColor: "#22c55e", tension: 0.3, fill: false },
          { label: "Mengurus Keluarga", data: [0], borderColor: "#f59e0b", backgroundColor: "#f59e0b", tension: 0.3, fill: false },
        ],
      },
      options: { scales: { y: { beginAtZero: true, max: 100 } }, plugins: { legend: { position: "bottom" } }, animation: { duration: 1000 } },
    });
    return () => { pie.destroy(); line.destroy(); };
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-gray-50">
      <div className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">Statistik Alumni</h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2 max-w-2xl mx-auto">Persentase keberhasilan lulusan Universitas Swadaya Gunung Jati dalam memasuki dunia kerja dan pencapaian lainnya.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10 sm:mb-12">
          {stats.map((s, i) => (
            <div key={s.label} className="bg-white p-4 sm:p-5 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${colorMap[s.color]}`}>
                <s.icon className="text-lg sm:text-xl" />
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">{s.value}%</p>
              <p className="font-semibold text-gray-800 text-sm sm:text-base">{s.label}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-4">Distribusi Status Alumni</h3>
            <div className="max-w-[220px] sm:max-w-[260px] mx-auto">
              <canvas ref={pieRef} />
            </div>
            <div className="mt-6 border-t pt-4">
              <h4 className="font-semibold text-gray-700 text-sm sm:text-base mb-3">Informasi Tambahan</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {info.map((i) => (
                  <div key={i.label} className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <i.icon className="text-blue-600 text-sm flex-shrink-0" />
                    <div>
                      <p className="text-base sm:text-lg font-bold text-gray-800">{i.value}</p>
                      <p className="text-[10px] sm:text-xs text-gray-500 leading-tight">{i.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-md">
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">Perkembangan Status Alumni</h3>
            <p className="text-gray-500 text-xs sm:text-sm mb-4">Tren status alumni dari tahun ke tahun berdasarkan status pekerjaan.</p>
            <canvas ref={lineRef} />
          </div>
        </div>
      </div>
    </section>
  );
}
