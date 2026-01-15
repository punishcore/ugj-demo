const stats = [
  { label: "Total Alumni", value: "12,450", icon: "👨‍🎓" },
  { label: "Tingkat Respon", value: "78%", icon: "📊" },
  { label: "Bekerja < 6 Bulan", value: "72%", icon: "💼" },
  { label: "Sesuai Bidang", value: "68%", icon: "🎯" },
  { label: "Rata-rata Gaji", value: "5.2 Jt", icon: "💰" },
  { label: "Lanjut S2", value: "12%", icon: "📚" },
];

export default function Stat() {
  return (
    <section id="statistik" className="py-16 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">Statistik Alumni 2025</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-center">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition">
            <span className="text-3xl">{s.icon}</span>
            <p className="text-2xl font-bold text-blue-600 mt-2">{s.value}</p>
            <p className="text-gray-500 text-sm mt-1">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
