"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { UserMenu } from "@/components/user-menu"
import { Pencil, Trash2, Home } from 'lucide-react'

interface DomainListing {
  id: string
  domain: string
  price: number
  description: string
  seller: string
  sellerEmail: string
  listedAt: number
  category: string
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<DomainListing[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUsername, setCurrentUsername] = useState("")
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [newDomain, setNewDomain] = useState("")
  const [newPrice, setNewPrice] = useState("")
  const [newDescription, setNewDescription] = useState("")
  const [newCategory, setNewCategory] = useState("crypto")
  const [newSellerEmail, setNewSellerEmail] = useState("")
  const [editingListing, setEditingListing] = useState<DomainListing | null>(null)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

  useEffect(() => {
    loadListings()
    const userStr = localStorage.getItem("xo_current_user")
    if (userStr) {
      const user = JSON.parse(userStr)
      setIsLoggedIn(true)
      setCurrentUsername(user.username)
      setUserEmail(user.email || "")
      setNewSellerEmail(user.email || "")
      setIsAdmin(user.isAdmin === true)
    }
    setIsLoading(false)
  }, [])

  const loadListings = () => {
    const stored = localStorage.getItem("xo_domain_listings")
    if (stored) {
      setListings(JSON.parse(stored))
    }
  }

  const saveListings = (updatedListings: DomainListing[]) => {
    localStorage.setItem("xo_domain_listings", JSON.stringify(updatedListings))
    setListings(updatedListings)
  }

  const handleCreateListing = () => {
    if (!isLoggedIn) {
      alert("Please log in to list domains.")
      return
    }

    if (!newDomain || !newPrice) {
      alert("Please fill in domain and price")
      return
    }

    const userStr = localStorage.getItem("xo_current_user")
    const user = userStr ? JSON.parse(userStr) : null

    const listing: DomainListing = {
      id: Date.now().toString(),
      domain: newDomain,
      price: Number.parseFloat(newPrice),
      description: newDescription,
      seller: user?.username || "Anonymous",
      sellerEmail: newSellerEmail || user?.email || "",
      listedAt: Date.now(),
      category: newCategory,
    }

    const updatedListings = [...listings, listing]

    try {
      localStorage.setItem("xo_domain_listings", JSON.stringify(updatedListings))
      setListings(updatedListings)
      console.log("[v0] Domain listing saved successfully:", listing)
      console.log("[v0] Total listings after save:", updatedListings.length)
    } catch (error) {
      console.error("[v0] Error saving domain listing:", error)
      alert("Failed to save listing. Please try again.")
      return
    }

    // Reset form
    setNewDomain("")
    setNewPrice("")
    setNewDescription("")
    setNewCategory("crypto")
    setNewSellerEmail(userEmail)

    // Close dialog and show success
    setIsCreateDialogOpen(false)
    
    // Show success message after dialog closes
    setTimeout(() => {
      alert("Domain listed successfully!")
    }, 100)
  }

  const handleEditListing = () => {
    if (!editingListing) return

    const updatedListings = listings.map((listing) =>
      listing.id === editingListing.id
        ? {
            ...editingListing,
            domain: newDomain,
            price: Number.parseFloat(newPrice),
            description: newDescription,
            category: newCategory,
            sellerEmail: newSellerEmail,
          }
        : listing,
    )

    saveListings(updatedListings)
    setEditingListing(null)
    setIsEditDialogOpen(false)
    resetForm()
  }

  const handleDeleteListing = (listingId: string) => {
    if (!confirm("Are you sure you want to delete this listing?")) return

    const updatedListings = listings.filter((listing) => listing.id !== listingId)
    saveListings(updatedListings)
  }

  const openEditDialog = (listing: DomainListing) => {
    setEditingListing(listing)
    setNewDomain(listing.domain)
    setNewPrice(listing.price.toString())
    setNewDescription(listing.description)
    setNewCategory(listing.category)
    setNewSellerEmail(listing.sellerEmail)
    setIsEditDialogOpen(true)
  }

  const resetForm = () => {
    setNewDomain("")
    setNewPrice("")
    setNewDescription("")
    setNewCategory("crypto")
    setNewSellerEmail(userEmail)
  }

  const handleBuyDomain = (listing: DomainListing) => {
    if (!isLoggedIn) {
      alert("Please log in to purchase a domain")
      return
    }

    const confirmed = confirm(
      `Purchase ${listing.domain} for $${listing.price.toLocaleString()}?\n\nSeller: ${listing.seller}\nContact: ${listing.sellerEmail}`,
    )

    if (confirmed) {
      alert("Purchase initiated! The seller will be notified and will contact you to complete the transfer.")
    }
  }

  const filteredListings = listings.filter(
    (listing) =>
      listing.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const isOwner = (listing: DomainListing) => {
    return listing.seller === currentUsername
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/xo-logo.png" alt="XO Logo" width={40} height={40} />
            <span className="text-xl font-bold text-[#c87642]">XO DEX API</span>
          </Link>
          <UserMenu />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="outline" className="mb-4 bg-transparent">
            <Home className="mr-2 h-4 w-4" />
            Return to Homepage
          </Button>
        </Link>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Domain Marketplace</h1>
            <p className="text-muted-foreground">Buy and sell premium domains</p>
          </div>

          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#c87642] hover:bg-[#b56632] text-white">
                List Your Domain
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle className="text-foreground">List a Domain for Sale</DialogTitle>
                <DialogDescription>
                  {!isLoggedIn
                    ? "Please log in to list domains on the marketplace."
                    : "Fill in the details below to list your domain on the marketplace."}
                </DialogDescription>
              </DialogHeader>
              {!isLoggedIn ? (
                <div className="py-4 text-center">
                  <p className="text-muted-foreground mb-4">Log in to list your domains on the marketplace.</p>
                  <Link href="/login">
                    <Button className="bg-[#c87642] hover:bg-[#b56632] text-white">Log In</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="domain">Domain Name</Label>
                      <Input
                        id="domain"
                        placeholder="example.com"
                        value={newDomain}
                        onChange={(e) => setNewDomain(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price (USD)</Label>
                      <Input
                        id="price"
                        type="number"
                        placeholder="1000"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                      >
                        <option value="crypto">Crypto/DeFi</option>
                        <option value="tech">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="web3">Web3</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="sellerEmail">Contact Email</Label>
                      <Input
                        id="sellerEmail"
                        type="email"
                        placeholder="your@email.com"
                        value={newSellerEmail}
                        onChange={(e) => setNewSellerEmail(e.target.value)}
                        className="bg-background"
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Tell buyers about this domain..."
                        value={newDescription}
                        onChange={(e) => setNewDescription(e.target.value)}
                        className="bg-background"
                        rows={4}
                      />
                    </div>
                  </div>
                  <Button onClick={handleCreateListing} className="w-full bg-[#c87642] hover:bg-[#b56632] text-white">
                    List Domain
                  </Button>
                </>
              )}
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle className="text-foreground">Edit Domain Listing</DialogTitle>
                <DialogDescription>Update the details of your domain listing.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <Label htmlFor="edit-domain">Domain Name</Label>
                  <Input
                    id="edit-domain"
                    placeholder="example.com"
                    value={newDomain}
                    onChange={(e) => setNewDomain(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-price">Price (USD)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    placeholder="1000"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-category">Category</Label>
                  <select
                    id="edit-category"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  >
                    <option value="crypto">Crypto/DeFi</option>
                    <option value="tech">Technology</option>
                    <option value="finance">Finance</option>
                    <option value="web3">Web3</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="edit-sellerEmail">Contact Email</Label>
                  <Input
                    id="edit-sellerEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={newSellerEmail}
                    onChange={(e) => setNewSellerEmail(e.target.value)}
                    className="bg-background"
                  />
                </div>
                <div>
                  <Label htmlFor="edit-description">Description</Label>
                  <Textarea
                    id="edit-description"
                    placeholder="Tell buyers about this domain..."
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    className="bg-background"
                    rows={4}
                  />
                </div>
              </div>
              <Button onClick={handleEditListing} className="w-full bg-[#c87642] hover:bg-[#b56632] text-white">
                Update Listing
              </Button>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="mb-8">
          <Input
            placeholder="Search domains..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-md bg-background"
          />
        </div>

        {/* Listings Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No domains listed yet. Be the first to list a domain!</p>
            </div>
          ) : (
            filteredListings.map((listing) => (
              <Card key={listing.id} className="bg-card border-border flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-[#c87642] text-xl">{listing.domain}</CardTitle>
                    <Badge variant="secondary">{listing.category}</Badge>
                  </div>
                  <CardDescription className="text-3xl font-bold text-foreground">
                    ${listing.price.toLocaleString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm mb-4">
                    {listing.description || "No description provided"}
                  </p>
                  <div className="text-xs text-muted-foreground">
                    <p>Listed by: {listing.seller}</p>
                    <p>Contact: {listing.sellerEmail}</p>
                    <p>Listed: {new Date(listing.listedAt).toLocaleDateString()}</p>
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {isLoggedIn && isOwner(listing) ? (
                    <>
                      <Button onClick={() => openEditDialog(listing)} variant="outline" className="flex-1" size="sm">
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDeleteListing(listing.id)}
                        variant="destructive"
                        className="flex-1"
                        size="sm"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  ) : (
                    <>
                      {!isLoggedIn ? (
                        <Link href="/login" className="w-full">
                          <Button className="w-full bg-[#c87642] hover:bg-[#b56632] text-white">
                            Log In to Buy
                          </Button>
                        </Link>
                      ) : (
                        <Button
                          onClick={() => handleBuyDomain(listing)}
                          className="w-full bg-[#c87642] hover:bg-[#b56632] text-white"
                        >
                          Buy Now
                        </Button>
                      )}
                    </>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
