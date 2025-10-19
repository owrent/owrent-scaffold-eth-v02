"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@civic/auth-web3/react";
import { CheckCircleIcon, ExclamationCircleIcon, PaperAirplaneIcon, XCircleIcon } from "@heroicons/react/24/outline";

interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  toolInvocations?: Array<{
    toolCallId: string;
    toolName: string;
    state: "call" | "result" | "error";
    args?: any;
    result?: any;
  }>;
}

export default function AIChatPage() {
  const { user } = useUser();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [errorDismissed, setErrorDismissed] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Reset error dismissed state when error changes
  useEffect(() => {
    if (error) {
      setErrorDismissed(false);
    }
  }, [error]);

  // Show sign-in prompt if not authenticated
  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="card bg-base-200 shadow-xl max-w-2xl mx-auto">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-2xl mb-4">AI Chat</h2>
            <p className="mb-6">Please sign in to access the AI chat assistant.</p>
            <div className="card-actions justify-center">
              <button type="button" className="btn btn-primary" onClick={() => (window.location.href = "/")}>
                Go to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle form submission with keyboard shortcuts
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };

    setInputValue("");
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);
    setErrorDismissed(false);

    try {
      console.log("Sending message to API...");
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Failed to send message" }));
        console.error("API error:", errorData);
        throw new Error(errorData.error || "Failed to send message");
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "",
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (reader) {
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");

          // Keep the last incomplete line in the buffer
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim()) continue;

            // Handle different streaming formats
            if (line.startsWith("0:")) {
              // Text chunk format: 0:"text"
              const text = line.substring(2).replace(/^"|"$/g, "");
              assistantMessage.content += text;
            } else if (line.startsWith("data: ")) {
              // SSE format: data: {...}
              try {
                const data = JSON.parse(line.substring(6));
                if (data.choices?.[0]?.delta?.content) {
                  assistantMessage.content += data.choices[0].delta.content;
                }
              } catch {
                // Not JSON, might be plain text
                assistantMessage.content += line.substring(6);
              }
            } else {
              // Plain text
              assistantMessage.content += line;
            }

            // Update UI
            setMessages(prev => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1] = { ...assistantMessage };
              return newMessages;
            });
          }
        }

        // Process any remaining buffer
        if (buffer.trim()) {
          if (buffer.startsWith("0:")) {
            const text = buffer.substring(2).replace(/^"|"$/g, "");
            assistantMessage.content += text;
          } else {
            assistantMessage.content += buffer;
          }

          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { ...assistantMessage };
            return newMessages;
          });
        }
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err instanceof Error ? err : new Error("An error occurred"));
    } finally {
      setIsLoading(false);
    }
  };

  // Handle textarea key down for keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (form) {
        form.requestSubmit();
      }
    }
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">AI Chat</h1>

      {/* Chat Interface */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body p-0">
          {/* Messages Display */}
          <div className="overflow-y-auto max-h-[600px] p-4 space-y-4">
            {messages.length === 0 && (
              <div className="text-center text-base-content/60 py-8">
                <p>Start a conversation with the AI assistant.</p>
                <p className="text-sm mt-2">Try asking about your connected services!</p>
              </div>
            )}

            {messages.map(message => (
              <div key={message.id} className={`chat ${message.role === "user" ? "chat-end" : "chat-start"}`}>
                <div
                  className={`chat-bubble ${message.role === "user" ? "chat-bubble-primary" : "chat-bubble-secondary"}`}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>

                  {/* Tool Execution Indicators */}
                  {message.toolInvocations && message.toolInvocations.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {message.toolInvocations.map(tool => (
                        <div key={tool.toolCallId} className="flex items-center gap-2 text-sm opacity-80">
                          {tool.state === "result" && (
                            <>
                              <CheckCircleIcon className="w-4 h-4 text-success" />
                              <span>Used tool: {tool.toolName}</span>
                            </>
                          )}
                          {tool.state === "call" && (
                            <>
                              <span className="loading loading-spinner loading-xs"></span>
                              <span>Using tool: {tool.toolName}</span>
                            </>
                          )}
                          {tool.state === "error" && (
                            <>
                              <XCircleIcon className="w-4 h-4 text-error" />
                              <span>Tool failed: {tool.toolName}</span>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && messages[messages.length - 1]?.role === "user" && (
              <div className="chat chat-start">
                <div className="chat-bubble chat-bubble-secondary">
                  <span className="loading loading-dots loading-sm"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Error Display */}
          {error && !errorDismissed && (
            <div className="alert alert-error mx-4 mb-4">
              <ExclamationCircleIcon className="w-6 h-6" />
              <span>{error.message || "An error occurred. Please try again."}</span>
              <button type="button" className="btn btn-sm btn-ghost" onClick={() => setErrorDismissed(true)}>
                Dismiss
              </button>
            </div>
          )}

          {/* Message Input */}
          <form onSubmit={onSubmit} className="p-4 border-t border-base-300">
            <div className="flex gap-2">
              <textarea
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
                className="textarea textarea-bordered flex-1 resize-none"
                rows={3}
                disabled={isLoading}
              />
              <button type="submit" className="btn btn-primary" disabled={isLoading || !inputValue.trim()}>
                {isLoading ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <PaperAirplaneIcon className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-xs text-base-content/60 mt-2">Press Enter to send, Shift+Enter for new line</p>
          </form>
        </div>
      </div>
    </div>
  );
}
