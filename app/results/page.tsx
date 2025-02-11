"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function ResultsComponent() {
  const searchParams = useSearchParams();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const resultJson = searchParams.get("result");
    if (resultJson) {
      try {
        setResult(JSON.parse(decodeURIComponent(resultJson)));
      } catch (error) {
        console.error("Error parsing result:", error);
      }
    }
  }, [searchParams]);

  const processResult = (result) => {
    if (!result) return [];
    return Object.entries(result).map(([key, value], index) => ({
      number: index + 1,
      content: `Género: ${value.Class}, Score: ${value.Score.toFixed(2)}`,
    }));
  };

  const processedResult = processResult(result);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-900">
      <Card className="w-full max-w-2xl bg-gray-800 border-[#39FF14] border-2">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#39FF14]">El género de tu canción es:</CardTitle>
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
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="text-white text-center">Loading...</div>}>
      <ResultsComponent />
    </Suspense>
  );
}

