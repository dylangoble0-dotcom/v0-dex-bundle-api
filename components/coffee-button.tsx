"use client"

import { Button } from "@/components/ui/button"
import { Coffee } from "lucide-react"
import { useState } from "react"

export function CoffeeButton({ className, size = "default" }: { className?: string; size?: "default" | "lg" }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: "guest" }),
      })

      if (!response.ok) {
        throw new Error("Failed to create checkout session")
      }

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("No checkout URL returned")
      }
    } catch (error) {
      console.error("[v0] Error creating checkout session:", error)
      alert("Failed to start checkout. Please try again.")
      setIsLoading(false)
    }
    // </CHANGE>
  }

  return (
    <Button onClick={handleClick} disabled={isLoading} size={size} className={className}>
      <Coffee className={size === "lg" ? "w-5 h-5" : "w-4 h-4"} />
      {isLoading ? "Loading..." : "Buy Me a Coffee"}
    </Button>
  )
}
