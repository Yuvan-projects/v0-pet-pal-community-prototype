"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sparkles, Send, X, PawPrint, Stethoscope, Apple, Brain, AlertTriangle, ChevronRight } from "lucide-react"

interface AiAssistantProps {
  isOpen: boolean
  onClose: () => void
  onOpen: () => void
}

interface Message {
  id: number
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

const quickPrompts = [
  { icon: Stethoscope, label: "Health Issues", prompt: "My pet seems unwell. What symptoms should I watch for?" },
  { icon: Apple, label: "Nutrition Tips", prompt: "What's the best diet for my dog?" },
  { icon: Brain, label: "Behavior Help", prompt: "Why is my pet acting differently lately?" },
  { icon: AlertTriangle, label: "First Aid", prompt: "What should I do in a pet emergency?" },
]

const aiResponses: Record<string, string> = {
  default:
    "Hello! I'm your AI Pet Assistant. I can help with questions about pet behavior, nutrition, health concerns, and first aid. What would you like to know about your furry friend today?",
  health:
    "For health concerns, it's important to monitor symptoms like lethargy, loss of appetite, vomiting, or unusual behavior. Common signs that warrant a vet visit include:\n\n• Persistent vomiting or diarrhea\n• Difficulty breathing\n• Sudden weight loss\n• Excessive scratching or skin issues\n• Changes in eating or drinking habits\n\nWould you like me to help identify specific symptoms you're noticing?",
  nutrition:
    "Great question about nutrition! Here are some key points for a healthy pet diet:\n\n🐕 **For Dogs:**\n• High-quality protein should be the first ingredient\n• Avoid foods with artificial preservatives\n• Fresh water always available\n• Portion control based on size and activity\n\n🐱 **For Cats:**\n• Cats are obligate carnivores - meat is essential\n• Wet food helps with hydration\n• Avoid toxic foods like onions, garlic, chocolate\n\nWhat type of pet do you have? I can give more specific advice!",
  behavior:
    "Behavioral changes in pets can indicate various things:\n\n**Common Causes:**\n• Environmental changes (new home, new family member)\n• Medical issues causing discomfort\n• Anxiety or stress\n• Lack of stimulation or exercise\n• Age-related changes\n\n**Tips to Help:**\n• Maintain consistent routines\n• Provide mental stimulation with toys\n• Ensure adequate exercise\n• Create safe spaces for rest\n\nCan you describe the specific behavior you're noticing?",
  emergency:
    "🚨 **Pet First Aid Basics:**\n\n**In an Emergency:**\n1. Stay calm - pets sense your stress\n2. Secure your pet safely\n3. Call your emergency vet immediately\n\n**Basic First Aid Kit Should Include:**\n• Gauze and bandages\n• Antiseptic wipes\n• Digital thermometer\n• Emergency vet contact\n• Pet carrier\n\n**Never give human medications** without vet approval.\n\nIs there a specific emergency situation you need help with right now?",
}

export function AiAssistant({ isOpen, onClose, onOpen }: AiAssistantProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: aiResponses.default,
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAiResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    if (
      lowerMessage.includes("health") ||
      lowerMessage.includes("sick") ||
      lowerMessage.includes("symptom") ||
      lowerMessage.includes("unwell")
    ) {
      return aiResponses.health
    }
    if (
      lowerMessage.includes("food") ||
      lowerMessage.includes("diet") ||
      lowerMessage.includes("nutrition") ||
      lowerMessage.includes("eat")
    ) {
      return aiResponses.nutrition
    }
    if (
      lowerMessage.includes("behavior") ||
      lowerMessage.includes("acting") ||
      lowerMessage.includes("strange") ||
      lowerMessage.includes("different")
    ) {
      return aiResponses.behavior
    }
    if (
      lowerMessage.includes("emergency") ||
      lowerMessage.includes("first aid") ||
      lowerMessage.includes("urgent") ||
      lowerMessage.includes("help")
    ) {
      return aiResponses.emergency
    }
    return "That's a great question! Based on what you've described, I'd recommend consulting with your local veterinarian for personalized advice. In the meantime, you can also check our community forum where other pet owners may have experienced similar situations. Is there anything else specific I can help you with?"
  }

  const handleSend = (messageText?: string) => {
    const text = messageText || input
    if (!text.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      role: "user",
      content: text,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: messages.length + 2,
        role: "assistant",
        content: getAiResponse(text),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={onOpen}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-lg shadow-primary/30 flex items-center justify-center transition-all hover:scale-110 animate-bounce"
          style={{ animationDuration: "2s" }}
        >
          <Sparkles className="w-6 h-6" />
        </button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[400px] max-w-[calc(100vw-3rem)] animate-in slide-in-from-bottom-4 duration-300">
          <Card className="shadow-2xl border-border/50 overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-primary text-primary-foreground p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-foreground/20 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">AI Pet Assistant</CardTitle>
                    <p className="text-sm text-primary-foreground/80">Always here to help</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-[350px] overflow-y-auto p-4 space-y-4 chat-scroll bg-muted/30">
                {messages.map((message) => (
                  <div key={message.id} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}>
                    <Avatar
                      className={`w-8 h-8 shrink-0 ${message.role === "assistant" ? "bg-primary" : "bg-secondary"}`}
                    >
                      <AvatarFallback
                        className={
                          message.role === "assistant"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }
                      >
                        {message.role === "assistant" ? (
                          <Sparkles className="w-4 h-4" />
                        ) : (
                          <PawPrint className="w-4 h-4" />
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : "bg-card border border-border rounded-bl-md"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 bg-primary">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Sparkles className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <span
                          className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts */}
              {messages.length <= 2 && (
                <div className="px-4 py-3 border-t border-border bg-card">
                  <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickPrompts.map((prompt, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(prompt.prompt)}
                        className="flex items-center gap-2 p-2 rounded-xl bg-accent hover:bg-accent/80 text-left transition-colors group"
                      >
                        <prompt.icon className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-xs font-medium text-accent-foreground truncate">{prompt.label}</span>
                        <ChevronRight className="w-3 h-3 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about your pet..."
                    className="flex-1 rounded-full border-border bg-muted/50 focus-visible:ring-primary"
                  />
                  <Button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isTyping}
                    size="icon"
                    className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
