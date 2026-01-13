"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MessageCircle, CheckCircle2, Clock, ChevronUp, Eye, X, PawPrint } from "lucide-react"

interface ForumPost {
  id: number
  title: string
  content: string
  author: { name: string; avatar: string }
  category: string
  timeAgo: string
  replies: number
  views: number
  votes: number
  solved: boolean
  petType: string
}

const forumPosts: ForumPost[] = [
  {
    id: 1,
    title: "My dog won't eat, any tips?",
    content:
      "My 3-year-old Labrador suddenly stopped eating his regular food. He seems healthy otherwise, plays normally, and drinks water. This has been going on for 2 days now. Should I be worried?",
    author: { name: "DogLover123", avatar: "/person-with-dog-avatar.jpg" },
    category: "Nutrition",
    timeAgo: "2 hours ago",
    replies: 15,
    views: 234,
    votes: 24,
    solved: false,
    petType: "Dog",
  },
  {
    id: 2,
    title: "How to stop a cat from scratching furniture?",
    content:
      "My indoor cat has destroyed two sofas already. I've tried scratching posts but she ignores them. Any proven methods to redirect this behavior?",
    author: { name: "CatWhisperer", avatar: "/cat-avatar-person.png" },
    category: "Behavior",
    timeAgo: "5 hours ago",
    replies: 32,
    views: 567,
    votes: 45,
    solved: true,
    petType: "Cat",
  },
  {
    id: 3,
    title: "Best flea treatment for sensitive skin dogs?",
    content:
      "My Shih Tzu has very sensitive skin and reacts badly to most flea treatments. Looking for gentle but effective options. Any recommendations?",
    author: { name: "FluffyMom", avatar: "/smiling-woman-avatar.png" },
    category: "Health",
    timeAgo: "1 day ago",
    replies: 28,
    views: 412,
    votes: 38,
    solved: true,
    petType: "Dog",
  },
  {
    id: 4,
    title: "Introducing a new puppy to an older dog",
    content:
      "We're adopting a puppy next week but already have a 7-year-old dog. What's the best way to introduce them without causing stress?",
    author: { name: "GrowingPack", avatar: "/family-avatar.jpg" },
    category: "Training",
    timeAgo: "2 days ago",
    replies: 41,
    views: 723,
    votes: 67,
    solved: false,
    petType: "Dog",
  },
  {
    id: 5,
    title: "Cat hiding and not coming out - is this normal?",
    content:
      "Adopted a rescue cat 3 days ago and she's been hiding under the bed constantly. Barely comes out to eat. Is this normal behavior for a new cat?",
    author: { name: "NewCatParent", avatar: "/young-person-avatar.png" },
    category: "Behavior",
    timeAgo: "3 days ago",
    replies: 19,
    views: 298,
    votes: 31,
    solved: true,
    petType: "Cat",
  },
]

const categories = ["All Topics", "Health", "Behavior", "Nutrition", "Training", "First Aid"]

export function Forum() {
  const [selectedCategory, setSelectedCategory] = useState("All Topics")
  const [searchQuery, setSearchQuery] = useState("")
  const [showNewPost, setShowNewPost] = useState(false)
  const [votedPosts, setVotedPosts] = useState<number[]>([])
  const [newPost, setNewPost] = useState({ title: "", content: "", category: "Health", petType: "Dog" })

  const filteredPosts = forumPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All Topics" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleVote = (id: number) => {
    setVotedPosts((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))
  }

  const handleSubmitPost = () => {
    if (newPost.title && newPost.content) {
      setShowNewPost(false)
      setNewPost({ title: "", content: "", category: "Health", petType: "Dog" })
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Community Forum</h1>
          <p className="text-muted-foreground mt-1">Ask questions and share solutions with fellow pet owners</p>
        </div>
        <Button
          onClick={() => setShowNewPost(true)}
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          New Question
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search forum posts..."
            className="pl-10 rounded-full border-border"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
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
      </div>

      {/* New Post Modal */}
      {showNewPost && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg animate-in zoom-in-95 duration-200">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Ask a Question</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowNewPost(false)} className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Question Title</label>
                <Input
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="e.g., My dog won't eat, any tips?"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Details</label>
                <Textarea
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Describe your pet's situation in detail..."
                  className="rounded-xl min-h-[120px]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm"
                  >
                    {categories
                      .filter((c) => c !== "All Topics")
                      .map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Pet Type</label>
                  <select
                    value={newPost.petType}
                    onChange={(e) => setNewPost({ ...newPost, petType: e.target.value })}
                    className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowNewPost(false)} className="flex-1 rounded-full">
                  Cancel
                </Button>
                <Button onClick={handleSubmitPost} className="flex-1 rounded-full bg-primary text-primary-foreground">
                  Post Question
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Forum Posts */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="border-border/50 hover:shadow-md transition-shadow">
            <CardContent className="p-4 sm:p-6">
              <div className="flex gap-4">
                {/* Vote Column */}
                <div className="flex flex-col items-center gap-1 shrink-0">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleVote(post.id)}
                    className={`rounded-full h-8 w-8 ${
                      votedPosts.includes(post.id)
                        ? "text-primary bg-accent"
                        : "text-muted-foreground hover:text-primary hover:bg-accent"
                    }`}
                  >
                    <ChevronUp className="w-5 h-5" />
                  </Button>
                  <span
                    className={`text-sm font-bold ${votedPosts.includes(post.id) ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {post.votes + (votedPosts.includes(post.id) ? 1 : 0)}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="secondary" className="rounded-full bg-accent text-accent-foreground">
                      {post.category}
                    </Badge>
                    <Badge variant="outline" className="rounded-full gap-1">
                      <PawPrint className="w-3 h-3" />
                      {post.petType}
                    </Badge>
                    {post.solved && (
                      <Badge className="rounded-full bg-primary text-primary-foreground gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Solved
                      </Badge>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold text-card-foreground mb-2 hover:text-primary cursor-pointer transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.content}</p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={post.author.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs bg-accent text-accent-foreground">
                          {post.author.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.timeAgo}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.replies} replies
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {post.views} views
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <PawPrint className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
