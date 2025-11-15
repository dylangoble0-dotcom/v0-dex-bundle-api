"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, LogOut } from 'lucide-react'
// import { Badge } from "@/components/ui/badge"

export function UserMenu() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    const userStr = localStorage.getItem("xo_current_user")
    if (userStr) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("xo_current_user")
    setIsLoggedIn(false)
    window.location.href = "/"
  }

  if (!isLoggedIn) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem asChild>
            <Link href="/login">Login</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/signup">Sign Up</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/marketplace">Domain Marketplace</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/community">Community Forum</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* </CHANGE> */}
          <DropdownMenuItem asChild>
            <Link href="/about">About</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/docs">Documentation</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/contact">Contact</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/subscription">Subscribe</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/analytics">Analytics</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/marketplace">Domain Marketplace</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/community">Community Forum</Link>
        </DropdownMenuItem>
        {/* </CHANGE> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/about">About</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/docs">Documentation</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/contact">Contact</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
