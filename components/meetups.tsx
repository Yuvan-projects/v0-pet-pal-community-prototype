"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Clock, Users, Search, Filter, PawPrint, ChevronRight, Star, Heart } from "lucide-react"

interface Meetup {
  id: number
  title: string
  description: string
  location: string
  address: string
  date: string
  time: string
  attendees: number
  maxAttendees: number
  petTypes: string[]
  host: { name: string; avatar: string }
  image: string
  featured: boolean
}

const meetups: Meetup[] = [
  {
    id: 1,
    title: "Saturday Morning Dog Walk",
    description:
      "Join us for a friendly group walk through Riverside Park. All dog sizes welcome! Great way to socialize your pup and meet other dog parents.",
    location: "Riverside Park",
    address: "123 River Road",
    date: "2026-01-18",
    time: "9:00 AM",
    attendees: 12,
    maxAttendees: 20,
    petTypes: ["Dogs"],
    host: { name: "Sarah M.", avatar: "/woman-walking-dog-avatar.jpg" },
    image: "/group-of-happy-dogs-walking-in-park-with-owners.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "Cat Cafe Social Hour",
    description:
      "Monthly meetup at Whiskers Cat Cafe. Share tips, stories, and enjoy coffee while cats roam around. Bring pictures of your cats!",
    location: "Whiskers Cat Cafe",
    address: "456 Main Street",
    date: "2026-01-20",
    time: "2:00 PM",
    attendees: 8,
    maxAttendees: 15,
    petTypes: ["Cats"],
    host: { name: "Mike R.", avatar: "/man-with-cat-avatar.jpg" },
    image: "/cozy-cat-cafe-interior-with-cats-and-people.jpg",
    featured: false,
  },
  {
    id: 3,
    title: "Puppy Playdate at Dog Park",
    description:
      "Special meetup for puppies under 1 year! Let your little ones play and learn social skills in a safe environment.",
    location: "Sunny Meadows Dog Park",
    address: "789 Oak Avenue",
    date: "2026-01-19",
    time: "10:30 AM",
    attendees: 15,
    maxAttendees: 25,
    petTypes: ["Dogs"],
    host: { name: "Emma L.", avatar: "/young-woman-with-puppy-avatar.jpg" },
    image: "/cute-puppies-playing-together-at-dog-park.jpg",
    featured: true,
  },
  {
    id: 4,
    title: "Pet First Aid Workshop",
    description:
      "Learn essential pet first aid skills from a certified veterinary technician. Covers CPR, choking, wounds, and emergency protocols.",
    location: "Community Center",
    address: "321 Community Lane",
    date: "2026-01-25",
    time: "1:00 PM",
    attendees: 18,
    maxAttendees: 30,
    petTypes: ["Dogs", "Cats", "All Pets"],
    host: { name: "Dr. James", avatar: "/veterinarian-doctor-avatar.jpg" },
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
  {
    id: 5,
    title: "Small Pet Owners Meetup",
    description:
      "Connect with other rabbit, hamster, and guinea pig owners. Share care tips and arrange playdates for your small friends!",
    location: "Pet Paradise Store",
    address: "555 Pet Lane",
    date: "2026-01-22",
    time: "11:00 AM",
    attendees: 6,
    maxAttendees: 12,
    petTypes: ["Rabbits", "Small Pets"],
    host: { name: "Lisa K.", avatar: "/placeholder.svg?height=40&width=40" },
    image: "/placeholder.svg?height=200&width=400",
    featured: false,
  },
]

const petTypeFilters = ["All", "Dogs", "Cats", "Small Pets"]

export function Meetups() {
  const [selectedFilter, setSelectedFilter] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [joinedMeetups, setJoinedMeetups] = useState<number[]>([])
  const [savedMeetups, setSavedMeetups] = useState<number[]>([])

  const filteredMeetups = meetups.filter((meetup) => {
    const matchesFilter = selectedFilter === "All" || meetup.petTypes.includes(selectedFilter)
    const matchesSearch =
      meetup.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meetup.location.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const featuredMeetups = filteredMeetups.filter((m) => m.featured)
  const regularMeetups = filteredMeetups.filter((m) => !m.featured)

  const handleJoin = (id: number) => {
    setJoinedMeetups((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
  }

  const handleSave = (id: number) => {
    setSavedMeetups((prev) => (prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]))
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Local Meetups</h1>
        <p className="text-muted-foreground mt-1">Find pet-friendly events and gatherings near you</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by event name or location..."
            className="pl-10 rounded-full border-border"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-muted-foreground shrink-0" />
          {petTypeFilters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full ${
                selectedFilter === filter ? "bg-primary text-primary-foreground" : "border-border hover:bg-accent"
              }`}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Meetups */}
      {featuredMeetups.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            Featured Events
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredMeetups.map((meetup) => (
              <Card key={meetup.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-all">
                <div className="relative">
                  <img
                    src={meetup.image || "/placeholder.svg"}
                    alt={meetup.title}
                    className="w-full h-48 object-cover"
                  />
                  <button
                    onClick={() => handleSave(meetup.id)}
                    className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      savedMeetups.includes(meetup.id)
                        ? "bg-primary text-primary-foreground"
                        : "bg-card/90 text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${savedMeetups.includes(meetup.id) ? "fill-current" : ""}`} />
                  </button>
                  <div className="absolute bottom-3 left-3 flex gap-2">
                    {meetup.petTypes.map((type, index) => (
                      <Badge key={index} className="rounded-full bg-card/90 text-card-foreground gap-1">
                        <PawPrint className="w-3 h-3" />
                        {type}
                      </Badge>
                    ))}
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-card-foreground">{meetup.title}</h3>
                    <Badge variant="secondary" className="rounded-full bg-primary/10 text-primary shrink-0">
                      Featured
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{meetup.description}</p>

                  <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary" />
                      {meetup.location}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      {formatDate(meetup.date)}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      {meetup.time}
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      {meetup.attendees}/{meetup.maxAttendees} attending
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={meetup.host.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                          {meetup.host.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">
                        Hosted by <span className="font-medium text-card-foreground">{meetup.host.name}</span>
                      </span>
                    </div>
                    <Button
                      onClick={() => handleJoin(meetup.id)}
                      className={`rounded-full gap-1 ${
                        joinedMeetups.includes(meetup.id)
                          ? "bg-accent text-accent-foreground hover:bg-accent/80"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {joinedMeetups.includes(meetup.id) ? "Joined" : "Join"}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Meetups */}
      <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Upcoming Events</h2>
        <div className="space-y-4">
          {regularMeetups.map((meetup) => (
            <Card key={meetup.id} className="border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row gap-4">
                  <img
                    src={meetup.image || "/placeholder.svg"}
                    alt={meetup.title}
                    className="w-full sm:w-40 h-32 object-cover rounded-xl shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div className="flex flex-wrap gap-2">
                        {meetup.petTypes.map((type, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="rounded-full bg-accent text-accent-foreground gap-1"
                          >
                            <PawPrint className="w-3 h-3" />
                            {type}
                          </Badge>
                        ))}
                      </div>
                      <button
                        onClick={() => handleSave(meetup.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 ${
                          savedMeetups.includes(meetup.id)
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-primary hover:bg-accent"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${savedMeetups.includes(meetup.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-card-foreground mb-2">{meetup.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{meetup.description}</p>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-primary" />
                        {meetup.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-primary" />
                        {formatDate(meetup.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-primary" />
                        {meetup.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-primary" />
                        {meetup.attendees}/{meetup.maxAttendees}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="w-7 h-7">
                          <AvatarImage src={meetup.host.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="bg-accent text-accent-foreground text-xs">
                            {meetup.host.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">{meetup.host.name}</span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleJoin(meetup.id)}
                        className={`rounded-full ${
                          joinedMeetups.includes(meetup.id)
                            ? "bg-accent text-accent-foreground hover:bg-accent/80"
                            : "bg-primary text-primary-foreground hover:bg-primary/90"
                        }`}
                      >
                        {joinedMeetups.includes(meetup.id) ? "Joined" : "Join Event"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {filteredMeetups.length === 0 && (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No meetups found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}
