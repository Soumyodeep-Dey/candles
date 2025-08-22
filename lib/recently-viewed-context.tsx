"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState, useCallback } from "react"
import type { Product } from "./products"

interface RecentlyViewedContextType {
  recentlyViewed: Product[]
  addToRecentlyViewed: (product: Product) => void
  clearRecentlyViewed: () => void
}

const RecentlyViewedContext = createContext<RecentlyViewedContextType | undefined>(undefined)

export function RecentlyViewedProvider({ children }: { children: React.ReactNode }) {
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("recentlyViewed")
    if (stored) {
      setRecentlyViewed(JSON.parse(stored))
    }
  }, [])

  const addToRecentlyViewed = useCallback(
    (product: Product) => {
      if (!mounted) return

      setRecentlyViewed((prev) => {
        // Remove if already exists to avoid duplicates
        const filtered = prev.filter((item) => item.id !== product.id)
        // Add to beginning and limit to 8 items
        const updated = [product, ...filtered].slice(0, 8)
        localStorage.setItem("recentlyViewed", JSON.stringify(updated))
        return updated
      })
    },
    [mounted],
  )

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([])
    localStorage.removeItem("recentlyViewed")
  }, [])

  return (
    <RecentlyViewedContext.Provider
      value={{
        recentlyViewed,
        addToRecentlyViewed,
        clearRecentlyViewed,
      }}
    >
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const context = useContext(RecentlyViewedContext)
  if (context === undefined) {
    throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider")
  }
  return context
}
