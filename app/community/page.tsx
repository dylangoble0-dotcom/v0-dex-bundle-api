"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { MessageSquare, ThumbsUp, User, Home } from 'lucide-react'

interface Comment {
  id: string
  postId: string
  author: string
  content: string
  timestamp: number
  likes: number
}

interface Post {
  id: string
  title: string
  content: string
  author: string
  timestamp: number
  likes: number
  comments: Comment[]
  category: string
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [username, setUsername] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isAdmin, setIsAdmin] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newContent, setNewContent] = useState("")
  const [newCategory, setNewCategory] = useState("general")
  const [commentContent, setCommentContent] = useState("")
  const [activePostId, setActivePostId] = useState("")

  useEffect(() => {
    loadPosts()
    const userStr = localStorage.getItem("xo_current_user")
    if (userStr) {
      const user = JSON.parse(userStr)
      setIsLoggedIn(true)
      setUsername(user.username)
      setIsAdmin(user.isAdmin === true)
    }
    setIsLoading(false)
  }, [])

  const loadPosts = () => {
    const stored = localStorage.getItem("xo_community_posts")
    if (stored) {
      setPosts(JSON.parse(stored))
    }
  }

  const savePosts = (updatedPosts: Post[]) => {
    localStorage.setItem("xo_community_posts", JSON.stringify(updatedPosts))
    setPosts(updatedPosts)
  }

  const handleCreatePost = () => {
    if (!isLoggedIn) {
      alert("Please log in to create posts.")
      return
    }

    if (!newTitle || !newContent) {
      alert("Please fill in title and content")
      return
    }

    const post: Post = {
      id: Date.now().toString(),
      title: newTitle,
      content: newContent,
      author: username,
      timestamp: Date.now(),
      likes: 0,
      comments: [],
      category: newCategory,
    }

    const updatedPosts = [post, ...posts]

    localStorage.setItem("xo_community_posts", JSON.stringify(updatedPosts))
    setPosts(updatedPosts)

    setNewTitle("")
    setNewContent("")
    setNewCategory("general")

    alert("Post created successfully!")
  }

  const handleLikePost = (postId: string) => {
    const updatedPosts = posts.map((post) => (post.id === postId ? { ...post, likes: post.likes + 1 } : post))
    savePosts(updatedPosts)
  }

  const handleAddComment = (postId: string) => {
    if (!isLoggedIn) {
      alert("Please log in to comment.")
      return
    }

    if (!commentContent.trim()) return

    const comment: Comment = {
      id: Date.now().toString(),
      postId,
      author: username,
      content: commentContent,
      timestamp: Date.now(),
      likes: 0,
    }

    const updatedPosts = posts.map((post) =>
      post.id === postId ? { ...post, comments: [...post.comments, comment] } : post,
    )
    savePosts(updatedPosts)
    setCommentContent("")
    setActivePostId("")
  }

  const filteredPosts = selectedCategory === "all" ? posts : posts.filter((post) => post.category === selectedCategory)

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
            <h1 className="text-4xl font-bold text-foreground mb-2">Community Forum</h1>
            <p className="text-muted-foreground">Connect with other developers and share insights</p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-[#c87642] hover:bg-[#b56632] text-white">
                Create Post
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle className="text-foreground">Create a New Post</DialogTitle>
                <DialogDescription>
                  {!isLoggedIn
                    ? "Please log in to create posts and participate in discussions."
                    : "Share your thoughts, questions, or insights with the community."}
                </DialogDescription>
              </DialogHeader>
              {!isLoggedIn ? (
                <div className="py-4 text-center">
                  <p className="text-muted-foreground mb-4">Log in to create posts and participate in discussions.</p>
                  <Link href="/login">
                    <Button className="bg-[#c87642] hover:bg-[#b56632] text-white">Log In</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <div className="space-y-4 py-4">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        placeholder="Post title..."
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
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
                        <option value="general">General Discussion</option>
                        <option value="technical">Technical Support</option>
                        <option value="api">API Questions</option>
                        <option value="showcase">Showcase</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="content">Content</Label>
                      <Textarea
                        id="content"
                        placeholder="Write your post..."
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="bg-background"
                        rows={6}
                      />
                    </div>
                  </div>
                  <Button onClick={handleCreatePost} className="w-full bg-[#c87642] hover:bg-[#b56632] text-white">
                    Publish Post
                  </Button>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className={selectedCategory === "all" ? "bg-[#c87642] hover:bg-[#b56632]" : ""}
          >
            All
          </Button>
          <Button
            variant={selectedCategory === "general" ? "default" : "outline"}
            onClick={() => setSelectedCategory("general")}
            className={selectedCategory === "general" ? "bg-[#c87642] hover:bg-[#b56632]" : ""}
          >
            General
          </Button>
          <Button
            variant={selectedCategory === "technical" ? "default" : "outline"}
            onClick={() => setSelectedCategory("technical")}
            className={selectedCategory === "technical" ? "bg-[#c87642] hover:bg-[#b56632]" : ""}
          >
            Technical
          </Button>
          <Button
            variant={selectedCategory === "api" ? "default" : "outline"}
            onClick={() => setSelectedCategory("api")}
            className={selectedCategory === "api" ? "bg-[#c87642] hover:bg-[#b56632]" : ""}
          >
            API
          </Button>
          <Button
            variant={selectedCategory === "showcase" ? "default" : "outline"}
            onClick={() => setSelectedCategory("showcase")}
            className={selectedCategory === "showcase" ? "bg-[#c87642] hover:bg-[#b56632]" : ""}
          >
            Showcase
          </Button>
        </div>

        {/* Posts List */}
        <div className="space-y-6">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No posts yet. Be the first to start a discussion!</p>
            </div>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-foreground text-xl mb-2">{post.title}</CardTitle>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          {post.author}
                        </div>
                        <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Badge variant="secondary">{post.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-4 whitespace-pre-wrap">{post.content}</p>

                  {/* Post Actions */}
                  <div className="flex items-center gap-4 mb-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikePost(post.id)}
                      className="text-muted-foreground hover:text-[#c87642]"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {post.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActivePostId(activePostId === post.id ? "" : post.id)}
                      className="text-muted-foreground hover:text-[#c87642]"
                    >
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments.length}
                    </Button>
                  </div>

                  {/* Comments */}
                  {post.comments.length > 0 && (
                    <div className="border-t border-border pt-4 space-y-3">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="bg-muted/50 p-3 rounded-lg">
                          <div className="flex items-center gap-2 mb-2 text-sm">
                            <User className="h-3 w-3" />
                            <span className="font-medium text-foreground">{comment.author}</span>
                            <span className="text-muted-foreground">
                              {new Date(comment.timestamp).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-foreground text-sm">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add Comment Form */}
                  {activePostId === post.id && (
                    <div className="mt-4 pt-4 border-t border-border">
                      {!isLoggedIn ? (
                        <div className="text-center py-4">
                          <p className="text-muted-foreground mb-3">Please log in to comment</p>
                          <Link href="/login">
                            <Button size="sm" className="bg-[#c87642] hover:bg-[#b56632] text-white">
                              Log In
                            </Button>
                          </Link>
                        </div>
                      ) : (
                        <>
                          <Textarea
                            placeholder="Write a comment..."
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            className="mb-2 bg-background"
                            rows={3}
                          />
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAddComment(post.id)}
                              size="sm"
                              className="bg-[#c87642] hover:bg-[#b56632] text-white"
                            >
                              Post Comment
                            </Button>
                            <Button onClick={() => setActivePostId("")} size="sm" variant="outline">
                              Cancel
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
