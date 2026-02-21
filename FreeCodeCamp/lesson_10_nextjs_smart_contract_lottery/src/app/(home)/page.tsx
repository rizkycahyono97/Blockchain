import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-16 text-center md:pt-32 md:pb-24">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Membangun Masa Depan dengan{' '}
            <span className="text-blue-600">Kode.</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
            Eksplorasi proyek, pemikiran, dan tutorial seputar pengembangan web,
            sistem cerdas, dan teknologi blockchain.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/blog"
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Baca Artikel
            </Link>
            <Link
              href="/about"
              className="px-8 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all"
            >
              Tentang Saya
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
