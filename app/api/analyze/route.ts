import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { url } = await req.json()

  // Base URL of your GCP Cloud Function
  const gcpFunctionBaseUrl = "XXXXXXXXXXXXXXXXXXXXXXXXXXX"

  // Encode the Spotify URL to ensure it's properly formatted in the query string
  const encodedSpotifyUrl = encodeURIComponent(url)

  // Construct the full GCP Cloud Function URL with the Spotify URL as a query parameter
  const gcpFunctionUrl = `${gcpFunctionBaseUrl}/?spotify_url=${encodedSpotifyUrl}`

  try {
    const response = await fetch(gcpFunctionUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error("Failed to analyze the track")
    }

    const data = await response.json()
    return NextResponse.json({ result: data }) // Return the entire result
  } catch (error) {
    console.error("Error calling GCP Cloud Function:", error)
    return NextResponse.json({ error: "An error occurred while analyzing the track" }, { status: 500 })
  }
}

