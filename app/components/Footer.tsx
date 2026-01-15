export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-3">Tracer Study UGJ</h3>
          <p className="text-gray-400 text-sm">Sistem pelacakan alumni untuk meningkatkan kualitas pendidikan dan relevansi kurikulum.</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Kontak</h3>
          <p className="text-gray-400 text-sm">CDC Universitas Swadaya Gunung Jati</p>
          <p className="text-gray-400 text-sm">Jl. Perjuangan No. 1, Cirebon</p>
          <p className="text-gray-400 text-sm">cdc@ugj.ac.id</p>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-3">Link</h3>
          <div className="flex flex-col gap-1 text-gray-400 text-sm">
            <a href="https://ugj.ac.id" className="hover:text-white">Website UGJ</a>
            <a href="#" className="hover:text-white">SIAKAD</a>
            <a href="#" className="hover:text-white">Karir Alumni</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-500 text-sm">
        © 2026 Universitas Swadaya Gunung Jati - Tracer Study
      </div>
    </footer>
  );
}
