"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { Dashboard } from "@/components/dashboard"
import { AiAssistant } from "@/components/ai-assistant"
import { Forum } from "@/components/forum"
import { PetProfiles } from "@/components/pet-profiles"
import { Meetups } from "@/components/meetups"

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>("home")
  const [showAiAssistant, setShowAiAssistant] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HeroSection onGetStarted={() => setActiveTab("dashboard")} />
      case "dashboard":
        return <Dashboard onOpenAi={() => setShowAiAssistant(true)} />
      case "forum":
        return <Forum />
      case "pets":
        return <PetProfiles />
      case "meetups":
        return <Meetups />
      default:
        return <HeroSection onGetStarted={() => setActiveTab("dashboard")} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} onOpenAi={() => setShowAiAssistant(true)} />
      <main>{renderContent()}</main>

      {/* AI Assistant Floating Button & Panel */}
      <AiAssistant
        isOpen={showAiAssistant}
        onClose={() => setShowAiAssistant(false)}
        onOpen={() => setShowAiAssistant(true)}
      />
    </div>
  )
}
