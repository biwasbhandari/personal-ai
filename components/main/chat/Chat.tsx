"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2 } from "lucide-react";
import Logout from "@/components/auth/Logout";

interface Message {
  id: number;
  content: string;
  sender: "user" | "ai";
}

export function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! I can help you find BCA questions.",
      sender: "ai",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (input.trim() && !isLoading) {
      // Add user message
      const userMessage: Message = {
        id: messages.length + 1,
        content: input.trim(),
        sender: "user",
      };
      setMessages((prev) => [...prev, userMessage]);
      setInput("");
      setIsLoading(true);

      try {
        // Send API request
        const response = await fetch("http://127.0.0.1:8000/api/research", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: input.trim() }),
        });

        const result = await response.json();

        if (result.success) {
          // Add AI response using the actual API data
          const aiMessage: Message = {
            id: messages.length + 2,
            content: result.data.raw || "No results found.",
            sender: "ai",
          };
          setMessages((prev) => [...prev, aiMessage]);
        } else {
          throw new Error("API request failed");
        }
      } catch (error) {
        const errorMessage: Message = {
          id: messages.length + 2,
          content: "An error occurred. Please try again.",
          sender: "ai",
        };
        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex flex-col h-[90vh] max-w-6xl mx-auto rounded-lg overflow-hidden">
      <ScrollArea className="flex-grow p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${
                  message.sender === "user"
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={
                      message.sender === "user"
                        ? "/placeholder-user.jpg"
                        : "/placeholder.svg"
                    }
                  />
                  <AvatarFallback>
                    {message.sender === "user" ? "U" : "AI"}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`rounded-lg p-3 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  }`}
                >
                  {message.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about BCA questions..."
            className="flex-grow"
            disabled={isLoading}
          />
          <Button
            type="submit"
            size="icon"
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
            <span className="sr-only">Send</span>
          </Button>
          <Logout />
        </form>
      </div>
    </div>
  );
}
