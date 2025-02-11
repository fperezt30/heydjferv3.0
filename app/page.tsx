import SpotifyAnalyzerForm from "@/components/SpotifyAnalyzerForm"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <h1 className="text-6xl font-bold mb-8 text-[#39FF14] neon-glow">Hey, DJ Fer</h1>
      <SpotifyAnalyzerForm />
    </main>
  )
}

