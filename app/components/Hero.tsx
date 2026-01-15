export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 text-center">
      <h1 className="text-5xl font-bold">Tracer Study UGJ</h1>
      <p className="mt-3 text-blue-200 text-lg">Universitas Swadaya Gunung Jati Cirebon</p>
      <p className="mt-6 text-xl max-w-2xl mx-auto">Melacak Jejak Alumni, Membangun Masa Depan Bangsa</p>
      <div className="mt-8 flex justify-center gap-4">
        <a href="#statistik" className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-50">Lihat Data</a>
        <a href="#grafik" className="border border-white px-6 py-2 rounded-full hover:bg-white/10">Grafik Alumni</a>
      </div>
    </section>
  );
}
