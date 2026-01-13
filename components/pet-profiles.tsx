"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Plus, PawPrint, Calendar, Weight, Heart, Edit2, Trash2, X, Syringe, AlertCircle } from "lucide-react"

interface Pet {
  id: number
  name: string
  type: string
  breed: string
  age: string
  weight: string
  image: string
  medicalHistory: string[]
  allergies: string[]
  vaccinations: { name: string; date: string }[]
}

const initialPets: Pet[] = [
  {
    id: 1,
    name: "Max",
    type: "Dog",
    breed: "Golden Retriever",
    age: "3 years",
    weight: "70 lbs",
    image: "/golden-retriever-dog-portrait-happy.jpg",
    medicalHistory: ["Neutered (2022)", "Hip dysplasia screening - clear"],
    allergies: ["Chicken"],
    vaccinations: [
      { name: "Rabies", date: "2024-01-15" },
      { name: "DHPP", date: "2024-01-15" },
      { name: "Bordetella", date: "2024-06-20" },
    ],
  },
  {
    id: 2,
    name: "Luna",
    type: "Cat",
    breed: "Maine Coon",
    age: "2 years",
    weight: "12 lbs",
    image: "/maine-coon-cat-portrait-fluffy.jpg",
    medicalHistory: ["Spayed (2023)", "Dental cleaning (2024)"],
    allergies: [],
    vaccinations: [
      { name: "FVRCP", date: "2024-02-10" },
      { name: "Rabies", date: "2024-02-10" },
    ],
  },
]

export function PetProfiles() {
  const [pets, setPets] = useState<Pet[]>(initialPets)
  const [showAddPet, setShowAddPet] = useState(false)
  const [editingPet, setEditingPet] = useState<Pet | null>(null)
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null)
  const [newPet, setNewPet] = useState({
    name: "",
    type: "Dog",
    breed: "",
    age: "",
    weight: "",
    medicalHistory: "",
    allergies: "",
  })

  const handleAddPet = () => {
    if (newPet.name && newPet.breed) {
      const pet: Pet = {
        id: pets.length + 1,
        name: newPet.name,
        type: newPet.type,
        breed: newPet.breed,
        age: newPet.age,
        weight: newPet.weight,
        image: `/placeholder.svg?height=200&width=200&query=${newPet.type.toLowerCase()} ${newPet.breed.toLowerCase()} portrait`,
        medicalHistory: newPet.medicalHistory ? newPet.medicalHistory.split(",").map((s) => s.trim()) : [],
        allergies: newPet.allergies ? newPet.allergies.split(",").map((s) => s.trim()) : [],
        vaccinations: [],
      }
      setPets([...pets, pet])
      setShowAddPet(false)
      setNewPet({ name: "", type: "Dog", breed: "", age: "", weight: "", medicalHistory: "", allergies: "" })
    }
  }

  const handleDeletePet = (id: number) => {
    setPets(pets.filter((p) => p.id !== id))
    if (selectedPet?.id === id) setSelectedPet(null)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">My Pets</h1>
          <p className="text-muted-foreground mt-1">Manage your pets' profiles and medical records</p>
        </div>
        <Button
          onClick={() => setShowAddPet(true)}
          className="rounded-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Pet
        </Button>
      </div>

      {/* Add Pet Modal */}
      {showAddPet && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between sticky top-0 bg-card z-10">
              <CardTitle className="text-xl">Add New Pet</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setShowAddPet(false)} className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Pet Name</label>
                  <Input
                    value={newPet.name}
                    onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    placeholder="e.g., Max"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Pet Type</label>
                  <select
                    value={newPet.type}
                    onChange={(e) => setNewPet({ ...newPet, type: e.target.value })}
                    className="w-full h-10 rounded-xl border border-border bg-background px-3 text-sm"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Bird">Bird</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Breed</label>
                <Input
                  value={newPet.breed}
                  onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                  placeholder="e.g., Golden Retriever"
                  className="rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Age</label>
                  <Input
                    value={newPet.age}
                    onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                    placeholder="e.g., 3 years"
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Weight</label>
                  <Input
                    value={newPet.weight}
                    onChange={(e) => setNewPet({ ...newPet, weight: e.target.value })}
                    placeholder="e.g., 70 lbs"
                    className="rounded-xl"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Medical History (comma separated)
                </label>
                <Textarea
                  value={newPet.medicalHistory}
                  onChange={(e) => setNewPet({ ...newPet, medicalHistory: e.target.value })}
                  placeholder="e.g., Neutered 2022, Hip screening - clear"
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Allergies (comma separated)</label>
                <Input
                  value={newPet.allergies}
                  onChange={(e) => setNewPet({ ...newPet, allergies: e.target.value })}
                  placeholder="e.g., Chicken, Wheat"
                  className="rounded-xl"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button variant="outline" onClick={() => setShowAddPet(false)} className="flex-1 rounded-full">
                  Cancel
                </Button>
                <Button onClick={handleAddPet} className="flex-1 rounded-full bg-primary text-primary-foreground">
                  Add Pet
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pet Detail Modal */}
      {selectedPet && (
        <div className="fixed inset-0 z-50 bg-foreground/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-start justify-between sticky top-0 bg-card z-10 pb-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16 border-4 border-primary/20">
                  <AvatarImage src={selectedPet.image || "/placeholder.svg"} />
                  <AvatarFallback className="bg-accent text-accent-foreground text-2xl">
                    {selectedPet.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-2xl">{selectedPet.name}</CardTitle>
                  <p className="text-muted-foreground">{selectedPet.breed}</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setSelectedPet(null)} className="rounded-full">
                <X className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-accent/50 rounded-xl p-4 text-center">
                  <PawPrint className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Type</div>
                  <div className="font-semibold text-card-foreground">{selectedPet.type}</div>
                </div>
                <div className="bg-accent/50 rounded-xl p-4 text-center">
                  <Calendar className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Age</div>
                  <div className="font-semibold text-card-foreground">{selectedPet.age}</div>
                </div>
                <div className="bg-accent/50 rounded-xl p-4 text-center">
                  <Weight className="w-5 h-5 text-primary mx-auto mb-2" />
                  <div className="text-sm text-muted-foreground">Weight</div>
                  <div className="font-semibold text-card-foreground">{selectedPet.weight}</div>
                </div>
              </div>

              {/* Allergies */}
              {selectedPet.allergies.length > 0 && (
                <div>
                  <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    Allergies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPet.allergies.map((allergy, index) => (
                      <Badge key={index} variant="destructive" className="rounded-full">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Medical History */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  Medical History
                </h4>
                <ul className="space-y-2">
                  {selectedPet.medicalHistory.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Vaccinations */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-3 flex items-center gap-2">
                  <Syringe className="w-4 h-4 text-primary" />
                  Vaccinations
                </h4>
                <div className="space-y-2">
                  {selectedPet.vaccinations.map((vax, index) => (
                    <div key={index} className="flex items-center justify-between bg-accent/30 rounded-xl px-4 py-2">
                      <span className="font-medium text-card-foreground">{vax.name}</span>
                      <span className="text-sm text-muted-foreground">{vax.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Pet Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets.map((pet) => (
          <Card key={pet.id} className="overflow-hidden border-border/50 hover:shadow-lg transition-all group">
            <div className="relative">
              <img src={pet.image || "/placeholder.svg"} alt={pet.name} className="w-full h-48 object-cover" />
              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full w-8 h-8 bg-card/90 hover:bg-card"
                  onClick={() => setEditingPet(pet)}
                >
                  <Edit2 className="w-3 h-3" />
                </Button>
                <Button
                  size="icon"
                  variant="secondary"
                  className="rounded-full w-8 h-8 bg-card/90 hover:bg-destructive hover:text-destructive-foreground"
                  onClick={() => handleDeletePet(pet.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge className="rounded-full bg-card/90 text-card-foreground gap-1">
                  <PawPrint className="w-3 h-3" />
                  {pet.type}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="text-xl font-bold text-card-foreground mb-1">{pet.name}</h3>
              <p className="text-muted-foreground mb-4">{pet.breed}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  {pet.age}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Weight className="w-4 h-4 text-primary" />
                  {pet.weight}
                </div>
              </div>

              {pet.allergies.length > 0 && (
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0" />
                  <div className="flex flex-wrap gap-1">
                    {pet.allergies.map((allergy, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs rounded-full text-destructive border-destructive/30"
                      >
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <Button
                onClick={() => setSelectedPet(pet)}
                className="w-full rounded-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                View Full Profile
              </Button>
            </CardContent>
          </Card>
        ))}

        {/* Add Pet Card */}
        <Card
          className="border-2 border-dashed border-border hover:border-primary cursor-pointer transition-colors group flex items-center justify-center min-h-[320px]"
          onClick={() => setShowAddPet(true)}
        >
          <CardContent className="text-center p-6">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/10 transition-colors">
              <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <h3 className="font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
              Add a New Pet
            </h3>
            <p className="text-sm text-muted-foreground mt-1">Create a profile for your furry friend</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
