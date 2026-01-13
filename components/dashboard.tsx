"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Clock,
  MessageCircle,
  Heart,
  Share2,
  Filter,
  Sparkles,
  TrendingUp,
  PawPrint,
  CheckCircle2,
} from "lucide-react"

interface DashboardProps {
  onOpenAi: () => void
}

const petProblems = [
  {
    id: 1,
    user: { name: "Sarah M.", avatar: "/smiling-woman-portrait.png", location: "2 miles away" },
    pet: { name: "Max", type: "Golden Retriever", age: "3 years" },
    problem:
      "My dog has been scratching excessively for the past week. No visible fleas but very itchy. Has anyone dealt with this?",
    category: "Health",
    timeAgo: "2 hours ago",
    replies: 12,
    helpful: 8,
    solved: false,
    image: "/golden-retriever-dog-scratching-itself.jpg",
  },
  {
    id: 2,
    user: { name: "Mike R.", avatar: "/man-with-glasses-portrait.png", location: "0.5 miles away" },
    pet: { name: "Luna", type: "Tabby Cat", age: "2 years" },
    problem:
      "Luna won't use her new litter box. I tried different litter types but she keeps going elsewhere. Any tips?",
    category: "Behavior",
    timeAgo: "4 hours ago",
    replies: 18,
    helpful: 15,
    solved: true,
    image: "/tabby-cat-sitting-next-to-litter-box-looking-confu.jpg",
  },
  {
    id: 3,
    user: { name: "Emma L.", avatar: "/young-woman-portrait.png", location: "1.2 miles away" },
    pet: { name: "Buddy", type: "Beagle", age: "5 years" },
    problem: "Buddy refuses to eat his regular food suddenly. He seems healthy otherwise. Should I be worried?",
    category: "Nutrition",
    timeAgo: "6 hours ago",
    replies: 24,
    helpful: 20,
    solved: false,
    image: "/beagle-dog-looking-sadly-at-food-bowl.jpg",
  },
  {
    id: 4,
    user: { name: "James K.", avatar: "/middle-aged-man-portrait.jpg", location: "3 miles away" },
    pet: { name: "Whiskers", type: "Persian Cat", age: "4 years" },
    problem: "How do I get my cat to accept our new puppy? Whiskers hisses every time they're in the same room.",
    category: "Behavior",
    timeAgo: "8 hours ago",
    replies: 31,
    helpful: 28,
    solved: true,
    image: "/persian-cat-hissing-at-small-puppy.jpg",
  },
]

const categories = ["All", "Health", "Behavior", "Nutrition", "Training", "First Aid"]

export function Dashboard({ onOpenAi }: DashboardProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [likedPosts, setLikedPosts] = useState<number[]>([])

  const filteredProblems =
    selectedCategory === "All" ? petProblems : petProblems.filter((p) => p.category === selectedCategory)

  const handleLike = (id: number) => {
    setLikedPosts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Pet Problems Feed</h1>
          <p className="text-muted-foreground mt-1">Nearby pet owners need your help</p>
        </div>
        <Button
          onClick={onOpenAi}
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 shadow-lg shadow-primary/20"
        >
          <Sparkles className="w-4 h-4" />
          Ask AI Assistant
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { icon: PawPrint, label: "Nearby Problems", value: "24", color: "text-primary" },
          { icon: CheckCircle2, label: "Solved Today", value: "12", color: "text-primary" },
          { icon: TrendingUp, label: "Trending Topics", value: "8", color: "text-primary" },
          { icon: MessageCircle, label: "Your Replies", value: "5", color: "text-primary" },
        ].map((stat, index) => (
          <Card key={index} className="border-border/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div>
                <div className="text-xl font-bold text-card-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full whitespace-nowrap ${
              selectedCategory === category ? "bg-primary text-primary-foreground" : "border-border hover:bg-accent"
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Problems Feed */}
      <div className="space-y-6">
        {filteredProblems.map((problem) => (
          <Card key={problem.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="flex flex-col lg:flex-row">
                {/* Image */}
                <div className="lg:w-72 shrink-0">
                  <img
                    src={problem.image || "/placeholder.svg"}
                    alt={`${problem.pet.name} the ${problem.pet.type}`}
                    className="w-full h-48 lg:h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6">
                  {/* User Info */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 border-2 border-primary/20">
                        <AvatarImage src={problem.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-accent text-accent-foreground">
                          {problem.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-card-foreground">{problem.user.name}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-3 h-3" />
                          {problem.user.location}
                          <span className="text-border">•</span>
                          <Clock className="w-3 h-3" />
                          {problem.timeAgo}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="rounded-full bg-accent text-accent-foreground">
                        {problem.category}
                      </Badge>
                      {problem.solved && (
                        <Badge className="rounded-full bg-primary text-primary-foreground gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Solved
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Pet Info */}
                  <div className="inline-flex items-center gap-2 bg-accent/50 rounded-full px-3 py-1 mb-3">
                    <PawPrint className="w-3 h-3 text-primary" />
                    <span className="text-sm text-accent-foreground font-medium">
                      {problem.pet.name} • {problem.pet.type} • {problem.pet.age}
                    </span>
                  </div>

                  {/* Problem Text */}
                  <p className="text-card-foreground leading-relaxed mb-4">{problem.problem}</p>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full gap-2 text-muted-foreground hover:text-primary hover:bg-accent"
                    >
                      <MessageCircle className="w-4 h-4" />
                      {problem.replies} Replies
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(problem.id)}
                      className={`rounded-full gap-2 ${
                        likedPosts.includes(problem.id)
                          ? "text-primary bg-accent"
                          : "text-muted-foreground hover:text-primary hover:bg-accent"
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${likedPosts.includes(problem.id) ? "fill-current" : ""}`} />
                      {problem.helpful + (likedPosts.includes(problem.id) ? 1 : 0)} Helpful
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="rounded-full gap-2 text-muted-foreground hover:text-primary hover:bg-accent"
                    >
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
