"use client";

import { useState } from "react";

/**
 * Debug Chat Component
 *
 * Development tool for debugging streaming responses from the AI chat API.
 * Displays raw chunks and full response for troubleshooting.
 *
 * @returns React component for debugging chat streams
 */
export default function DebugChat() {
  const [response, setResponse] = useState("");
  const [rawChunks, setRawChunks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Test streaming response from chat API
   * Sends a simple message and displays raw streaming data
   */
  const testStream = async () => {
    setResponse("");
    setRawChunks([]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: "Say hello" }],
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let fullText = "";
        const chunks: string[] = [];

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          chunks.push(chunk);
          fullText += chunk;

          setRawChunks(prev => [...prev, chunk]);
          setResponse(fullText);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Stream Debug</h1>

      <button onClick={testStream} disabled={isLoading} className="btn btn-primary mb-4">
        {isLoading ? "Loading..." : "Test Stream"}
      </button>

      <div className="space-y-4">
        <div>
          <h2 className="font-bold">Full Response:</h2>
          <pre className="bg-base-200 p-4 rounded overflow-auto max-h-96">{response || "(no response yet)"}</pre>
        </div>

        <div>
          <h2 className="font-bold">Raw Chunks ({rawChunks.length}):</h2>
          <div className="bg-base-200 p-4 rounded overflow-auto max-h-96 space-y-2">
            {rawChunks.map((chunk, i) => (
              <div key={i} className="border-b border-base-300 pb-2">
                <div className="text-xs text-base-content/60">Chunk {i + 1}:</div>
                <pre className="text-xs">{chunk}</pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
