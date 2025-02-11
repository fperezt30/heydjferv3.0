"use client"

import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const resultJson = searchParams.get("result")

  let result
  try {
    result = resultJson ? JSON.parse(decodeURIComponent(resultJson)) : null
  } catch (error) {
    console.error("Error parsing result:", error)
    result = null
  }

  // Helper function to render nested objects and arrays
  const renderValue = (value: any): string => {
    if (Array.isArray(value)) {
      return value.map((item) => (typeof item === "object" ? renderObject(item) : String(item))).join(", ")
    } else if (typeof value === "object" && value !== null) {
      return renderObject(value)
    } else {
      return typeof value === "number" ? value.toFixed(2) : String(value)
    }
  }

  // Helper function to render an object as a formatted string
  const renderObject = (obj: any): string => {
    return Object.entries(obj)
      .map(([key, val]) => `${key}: ${typeof val === "number" ? (val as number).toFixed(2) : val}`)
      .join(", ")
  }

  // Function to process and renumber the result
  const processResult = (result: any) => {
    if (!result) return []
    return Object.entries(result).map(([key, value], index) => ({
      number: index + 1,
      content: `Género: ${value.Género}, Score: ${value.Score.toFixed(2)}`,
    }))
  }

  const processedResult = processResult(result)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <Card className="w-full max-w-2xl bg-gray-800 border-[#39FF14] border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#39FF14] neon-glow">El género de tu canción es:</CardTitle>
        </CardHeader>
        <CardContent>
          {processedResult.length > 0 ? (
            <div className="space-y-4 text-white">
              {processedResult.map(({ number, content }) => (
                <div key={number} className="mb-2">
                  <span className="font-semibold text-[#39FF14]">{number}: </span>
                  {content}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-white text-center">No results to display.</p>
          )}
          <Link href="/" className="block mt-6">
            <Button className="w-full bg-[#39FF14] hover:bg-[#32CD32] text-gray-900 font-semibold">
              Analyze Another Track
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

