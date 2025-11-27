import Quiz from "@/components/Quiz";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-block p-3 rounded-2xl bg-blue-600 text-white mb-6 shadow-lg transform rotate-3">
            <span className="text-2xl font-bold tracking-wider">QUALIOPI</span>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl mb-4">
            Validation des Acquis
          </h1>
          <p className="max-w-xl mx-auto text-xl text-gray-500">
            Session Vente - Certification Officielle
          </p>
        </div>
        <Quiz />
      </div>
    </main>
  );
}
