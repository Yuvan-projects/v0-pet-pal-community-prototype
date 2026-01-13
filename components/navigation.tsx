"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Home, LayoutDashboard, MessageSquare, PawPrint, MapPin, Sparkles, Menu, X } from "lucide-react"

interface NavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  onOpenAi: () => void
}

export function Navigation({ activeTab, setActiveTab, onOpenAi }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "forum", label: "Forum", icon: MessageSquare },
    { id: "pets", label: "My Pets", icon: PawPrint },
    { id: "meetups", label: "Meetups", icon: MapPin },
  ]

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => setActiveTab("home")}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <PawPrint className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">PetPal</span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(item.id)}
                className={`rounded-full gap-2 ${
                  activeTab === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Button>
            ))}
          </nav>

          {/* AI Assistant Button */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              onClick={onOpenAi}
              className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-lg shadow-primary/20"
            >
              <Sparkles className="w-4 h-4" />
              AI Assistant
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  onClick={() => {
                    setActiveTab(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className={`justify-start rounded-xl gap-3 ${
                    activeTab === item.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Button>
              ))}
              <Button
                onClick={() => {
                  onOpenAi()
                  setMobileMenuOpen(false)
                }}
                className="justify-start rounded-xl bg-primary text-primary-foreground gap-3 mt-2"
              >
                <Sparkles className="w-5 h-5" />
                AI Pet Assistant
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
