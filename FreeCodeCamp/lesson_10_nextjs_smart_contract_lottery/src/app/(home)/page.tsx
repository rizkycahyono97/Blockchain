import ConnectWallet from '@/src/components/wallet/ConnectWallet';

export default function HomePage() {
  return (
    <main>
      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Efek Background Blur (Glassmorphism style) */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#3b82f6] to-[#9333ea] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>

        <div className="mx-auto max-w-2xl py-20 sm:py-32">
          <div className="text-center">
            {/* Badge Status */}
            <div className="mb-8 flex justify-center">
              <div className="relative rounded-full px-4 py-1 text-sm leading-6 text-blue-600 ring-1 ring-blue-600/20 bg-blue-50/50 font-medium">
                Web3 Lottery is live on Sepolia Testnet 🚀
              </div>
            </div>

            {/* Judul Utama */}
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Decentralized <span className="text-blue-600">Lottery</span>{' '}
              System
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              Halo **Ch4rl0tt3**! Selamat datang di platform lottery berbasis
              Smart Contract. Ikuti undian yang transparan, aman, dan sepenuhnya
              terdesentralisasi.
            </p>

            {/* Area Interaksi Wallet */}
            <div className="mt-10 flex flex-col items-center justify-center gap-y-6">
              <div className="w-full max-w-md p-8 bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl shadow-blue-100 border border-white">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-6 text-center">
                  WALLET GATEWAY
                </h2>

                {/* Memanggil Komponen Connect Wallet */}
                <div className="flex flex-col items-center gap-4">
                  <ConnectWallet />
                </div>

                <p className="mt-6 text-[10px] text-gray-400 text-center leading-relaxed">
                  PASTIKAN KAMU MENGGUNAKAN JARINGAN TESTNET SEPOLIA <br />
                  DAN MEMILIKI SALDO ETH UNTUK GAS FEE.
                </p>
              </div>

              {/* Link Tambahan */}
              <div className="flex items-center gap-x-6 mt-4">
                <a
                  href="#rules"
                  className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors"
                >
                  Cara Bermain <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Dekorasi Bawah */}
        <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
          <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#60a5fa] to-[#c084fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
        </div>
      </div>
    </main>
  );
}
