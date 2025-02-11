"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Loader2 } from "lucide-react"
import Link from "next/link"

export default function SpotifyAnalyzerForm() {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (!url.includes("open.spotify.com")) {
      setError("Por favor, usa una URL de Spotify válida")
      setLoading(false)
      return
    }

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze the track")
      }

      const data = await response.json()
      const encodedResult = encodeURIComponent(JSON.stringify(data.result))
      router.push(`/results?result=${encodedResult}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while analyzing the track")
      setLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md bg-gray-800 border-[#39FF14] border-2">
      <CardHeader className="text-center">
        <CardTitle className="text-[#39FF14]">¿Qué género estoy escuchando?</CardTitle>
        <CardDescription className="text-gray-400">Ingresa una URL de una canción de Spotify:</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="https://open.spotify.com/track/..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-gray-700 text-white border-[#39FF14] text-center"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#39FF14] hover:bg-[#32CD32] text-gray-900 font-semibold"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Descúbrelo aquí"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-center">
        {error && <p className="text-red-400 text-center mb-2">{error}</p>}
        <Link
          href="https://www.youtube.com/watch?v=XAwyQAza3Ns&ab_channel=PitayaJoyer%C3%ADa"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#39FF14] hover:underline text-sm mt-2"
        >
          ¿Cómo obtengo el link de una canción en Spotify?
        </Link>
      </CardFooter>
    </Card>
  )
}

